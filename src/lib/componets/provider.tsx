import { createContext, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { IStackProvider } from '..'
import { STORAGE_KEY_NAME } from '../constants'
import { isHashRoute, matchRouteToPathname } from '../utils'
import Screen, { IScreen } from '../data/screen'
import Stacks from './stacks'

export const ReactStackContext = createContext(null)

const StackProvider = ({ duration, delay, children }: IStackProvider) => {
  const screenList = useRef<IScreen[]>([])
  const checkMultipleMovesOrClear = useRef<boolean>(false)
  const beforeHash = useRef<string>('')
  const beforePathname = useRef<string>('')

  const [stacks, setStacks] = useState<IScreen[]>([])
  const [historyIdx, setHistoryIdx] = useState<number>(0)

  const addScreen = useCallback((data: IScreen) => {
    screenList.current = [...screenList.current, data]
  }, [])

  const updateStacks = useCallback((to: string | number, isClear = false) => {
    const isToNo = typeof to === 'number'

    if(isToNo) {
      if(to < -1) checkMultipleMovesOrClear.current = true
      setStacks(stacks.slice(0, stacks.length + to))
    } else {
      if(isClear) checkMultipleMovesOrClear.current = true
      const stackData = matchRouteToPathname(screenList.current, to)
      setStacks(isClear ? [stackData] : [...stacks, stackData])
    }
  }, [stacks])
  
  const checkGoForward = useCallback(() => {
    const stateIndex = window.history?.state?.index
    if (typeof stateIndex !== 'number') window.history.replaceState({ index: historyIdx + 1 }, '')

    const index = typeof stateIndex === 'number' ? stateIndex : historyIdx + 1
    return index > historyIdx
  }, [historyIdx])

  const setCurrentHistoryIndex = useCallback(() => {
    const stateIndex = window.history?.state?.index 
    setHistoryIdx(stateIndex ? stateIndex : historyIdx + 1)
  }, [historyIdx])

  const historyChangeStack = useCallback(() => {
    // 히스토리 인덱스 재할당
    setCurrentHistoryIndex()

    // 여러 히스토리가 이동하거나 클리어 옵션 설정에는 스택 설정을 진행하기 때문에, 아래의 설정을 진행하지 않음
    if(checkMultipleMovesOrClear.current) {
      checkMultipleMovesOrClear.current = false
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
  }, [stacks, historyIdx])

  const initStorageStackData = useCallback(() => {
    const { href, origin } = window.location
    const storageData = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY_NAME))

    if(!storageData || storageData.length === 0) return

    const allPath = href.split(origin)[1]
    const storageStacks: IScreen[] = storageData.map((screen: IScreen) => {
      return isHashRoute(screen.route) 
        ? Screen.hashScreen(allPath) 
        : matchRouteToPathname(screenList.current, screen.URIPath) 
    })

    if(storageStacks[storageStacks.length - 1].URIPath !== allPath) {
      return false
    }

    setStacks(storageStacks)
  
    return true
  }, [stacks, historyIdx])

  // 히스토리 변화에 대한 이벤트 등록
  useEffect(() => {
    beforePathname.current = window.location.pathname
    window.addEventListener('popstate', historyChangeStack)
    return () => {
      window.removeEventListener('popstate', historyChangeStack)
    }
  }, [stacks, historyIdx])

  // 스택 변경 시 스토리지에 스택 정보 저장
  useEffect(() => { 
    if(stacks.length === 0) return
    const storageData = stacks.map((d) => ({
      ...d,
      component: null
    }))
    window.sessionStorage.setItem(STORAGE_KEY_NAME, JSON.stringify(storageData))
  }, [stacks])

  useLayoutEffect(() => {
    // 초기 히스토리 인덱스 설정
    const index = window.history?.state?.index
    if(index) {
      setHistoryIdx(index)
    } else {
      window.history.replaceState({ index: 1 }, '')
    }

    // 진입시 스토리지에 데이터 있는지 확인 후 초기 스택 설정
    if(initStorageStackData()) return
    updateStacks(window.location.pathname)
  }, [])

  return (
    <div className="react-stack-area">
      <ReactStackContext.Provider value={{ addScreen, stacks, updateStacks, historyIdx, setHistoryIdx }}>
        {children}
        <Stacks duration={duration} delay={delay} />
      </ReactStackContext.Provider>
    </div>
  )
}

export default StackProvider