import { createContext, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { IStackProvider } from '..'
import { ANIMAITON_DELAY, ANIMATION_DURATION, STORAGE_KEY_SCREEN_STACKS } from '../constants'
import { isHashRoute, matchRouteToPathname } from '../utils'
import Screen, { IScreen } from '../data/screen'
import Stacks from './stacks'
import inMemoryCache from '../utils/inMemoryCache'

export const ReactStackContext = createContext(null)

const StackProvider = ({ duration, delay, children, progressIndicator }: IStackProvider) => {
  const screenList = useRef<IScreen[]>([])
  const checkMultipleMovesOrClear = useRef<boolean>(false)
  const beforeHash = useRef<string>('')
  const beforePathname = useRef<string>('')

  const [stacks, setStacks] = useState<IScreen[]>([])
  const [isLoading, setLoading] = useState(false)
  const [isPDC, setPDC] = useState(false)

  const addScreen = useCallback((data: IScreen) => {
    screenList.current = [...screenList.current, data]
  }, [])

  const changeLastScreen = useCallback((to: string) => {
    const baseStack = inMemoryCache.getScreens()
    const stackData = matchRouteToPathname(screenList.current, to)
    inMemoryCache.setScreens([...baseStack.slice(0, baseStack.length - 1), stackData])
    setStacks([...baseStack.slice(0, baseStack.length - 1), stackData])
  }, [stacks])

  const updateStacks = useCallback((to: string | number, isClear = false) => {
    const isToNo = typeof to === 'number'
    const baseStack = inMemoryCache.getScreens()

    if(isToNo) {
      if(to < -1) checkMultipleMovesOrClear.current = true
      inMemoryCache.setScreens(baseStack.slice(0, baseStack.length + to))
      setStacks(baseStack.slice(0, baseStack.length + to))
    } else {
      if(isClear) checkMultipleMovesOrClear.current = true
      const stackData = matchRouteToPathname(screenList.current, to)
      inMemoryCache.setScreens(isClear ? [stackData] : [...baseStack, stackData])
      setStacks(isClear ? [stackData] : [...baseStack, stackData])
    }
  }, [stacks])
  
  const checkGoForward = () => {
    const historyIndex = inMemoryCache.getHistoryIndex()
    const stateIndex = window.history?.state?.index
    if (typeof stateIndex !== 'number') {
      window.history.replaceState({ index: historyIndex + 1 }, '')
    }

    const index = typeof stateIndex === 'number' ? stateIndex : historyIndex + 1
    inMemoryCache.setHistoryIndex(index)
    return index > historyIndex
  }

  const historyChangeStack = useCallback(() => {
    // 여러 히스토리가 이동하거나 클리어 옵션 설정에는 스택 설정을 진행하기 때문에, 아래의 설정을 진행하지 않음
    if(checkMultipleMovesOrClear.current) {
      checkMultipleMovesOrClear.current = false
      window.history.replaceState({ index: 1 }, '')
      return
    }

    const isForward = checkGoForward()
    const { pathname, hash, href, origin } = window.location
    const allPath = href.split(origin)[1]
    const bPath = beforePathname.current
    const bHash = beforeHash.current
    
    beforeHash.current = hash
    beforePathname.current = pathname

    // 패스는 같고 해시만 변했을 때
    if(pathname === bPath && hash && (!bHash || isForward)) {
      const newHashScreen = Screen.hashScreen(allPath)
      setStacks([...stacks, newHashScreen])
      return
    }
    
    updateStacks(isForward ? allPath : -1)
  }, [stacks])

  const initStorageStackData = useCallback(() => {
    const { href, origin } = window.location
    const storageStacksData = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY_SCREEN_STACKS))

    if(!storageStacksData || storageStacksData.length === 0) return

    const allPath = decodeURI(href.split(origin)[1])
    const storageStacks: IScreen[] = storageStacksData.map((screen: IScreen) => {
      return isHashRoute(screen.route) 
        ? Screen.hashScreen(screen.URIPath) 
        : matchRouteToPathname(screenList.current, screen.URIPath) 
    })
    if(storageStacks[storageStacks.length - 1].URIPath !== allPath 
      || storageStacks.length !== window.history?.state?.index) {
      return false
    }

    inMemoryCache.setScreens(storageStacks)
    setStacks(storageStacks)
  
    return true
  }, [stacks])

  // 히스토리 변화에 대한 이벤트 등록
  useEffect(() => {
    beforePathname.current = window.location.pathname
    window.addEventListener('popstate', historyChangeStack)
    return () => {
      window.removeEventListener('popstate', historyChangeStack)
    }
  }, [stacks])

  // 스택 변경 시 스토리지에 저장
  useEffect(() => { 
    if(stacks.length === 0) return
    const storageData = stacks.map((d) => ({
      ...d,
      component: null
    }))
    window.sessionStorage.setItem(STORAGE_KEY_SCREEN_STACKS, JSON.stringify(storageData))
  }, [stacks])

  useLayoutEffect(() => {
    // 초기 히스토리 인덱스 설정
    const index = window.history?.state?.index
    if(index) {
      inMemoryCache.setHistoryIndex(index)
    } else {
      window.history.replaceState({ index: 1 }, '')
    }

    // 진입시 스토리지에 데이터 있는지 확인 후 초기 스택 설정
    if(initStorageStackData()) return
    updateStacks(window.location.pathname)
  }, [])

  const animationDuration = typeof duration === 'number' ? duration : ANIMATION_DURATION
  const animationDelay = typeof delay === 'number' ? delay : ANIMAITON_DELAY

  return (
    <div className="react-stack-area">
      <ReactStackContext.Provider value={{ 
        addScreen, stacks, updateStacks, changeLastScreen, animationDuration, animationDelay,
        isPDC, setPDC, isLoading, setLoading, progressIndicator
      }}>
        <Stacks />
        {children}
      </ReactStackContext.Provider>
    </div>
  )
}

export default StackProvider