import { createContext, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { IStackProvider } from '..'
import { STORAGE_KEY_NAME } from '../constants'
import { isHashRoute, matchLastSingleRoute, matchRouteToPathname } from '../utils'
import Screen, { IScreen } from '../data/screen'
import Stacks from './stacks'

export const ReactStackContext = createContext(null)

const StackProvider = ({ duration, children }: IStackProvider) => {
  const screenList = useRef<IScreen[]>([])
  const beforeHash = useRef<string>('')
  const beforePathname = useRef<string>('')
  const checkHistoryGo = useRef<boolean>(false)

  const [stacks, setStacks] = useState<IScreen[]>([])
  const [historyIdx, setHistoryIdx] = useState<number>(0)

  const addScreen = useCallback((data: IScreen) => {
    screenList.current = [...screenList.current, data]
  }, [])

  const updateStacks = useCallback((to: string | number, isClear = false) => {
    const isToNo = typeof to === 'number'

    if(isToNo) {
      setStacks(stacks.slice(0, stacks.length + to))
    } else {
      const stackData = matchRouteToPathname(screenList.current, to)
      setStacks(isClear ? [stackData] : [...stacks, stackData])
    }
  }, [stacks])

  const checkIsForward = useCallback(() => {
    const { state } = window.history
    if (!state) window.history.replaceState({ index: historyIdx + 1 }, '')

    const index = state ? state.index : historyIdx + 1
    const isForward = index > historyIdx
    setHistoryIdx(index)

    return isForward
  }, [historyIdx])

  const historyChangeStack = useCallback(() => {
    // useNavigation 에서 조건문에 따라 설정됨
    if(checkHistoryGo.current) {
      checkHistoryGo.current = false
      return
    }

    const isForward = checkIsForward()
    const { pathname, hash } = window.location
    const bPath = beforePathname.current
    const bHash = beforeHash.current
    
    beforeHash.current = hash
    beforePathname.current = pathname

    // 패스는 같고 해시만 변했을 때
    if(pathname === bPath && hash && (!bHash || isForward)) {
      setStacks([...stacks, new Screen({ route: hash })])
      return
    }
    
    updateStacks(isForward ? pathname : -1)
  }, [stacks, historyIdx])

  const initStorageStackData = useCallback(() => {
    const { pathname, hash } = window.location
    const storageData = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY_NAME))
    if(!storageData || storageData.length === 0) return

    const storageStacks = storageData.map((route: string) => {
      return isHashRoute(route) 
        ? new Screen({ route }) 
        : matchRouteToPathname(screenList.current, route)
    })

    if(!matchLastSingleRoute(storageStacks, pathname)
      || (hash && storageStacks[storageStacks.length - 1].route !== hash)) {
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
    const storageData = stacks.map((d) => d.route)
    window.sessionStorage.setItem(STORAGE_KEY_NAME, JSON.stringify(storageData))
  }, [stacks])
  
  // 초기 히스토리 인덱스 설정
  useEffect(() => {
    const index = window.history?.state?.index
    if(index) {
      setHistoryIdx(index)
    } else {
      window.history.replaceState({ index: 0 }, '')
    }
  }, [])

  // 진입시 스토리지에 데이터 있는지 확인 후 초기 스택 설정
  useLayoutEffect(() => {
    if(initStorageStackData()) return
    updateStacks(window.location.pathname)
  }, [])

  return (
    <div className="react-stack-area">
      <ReactStackContext.Provider value={{addScreen, stacks, updateStacks, historyIdx, setHistoryIdx, checkHistoryGo}}>
        {children}
        <Stacks duration={duration} />
      </ReactStackContext.Provider>
    </div>
  )
}

export default StackProvider