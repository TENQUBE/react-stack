import { createContext, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { AnimationClassName, AnimationType } from '../interfaces'
import { IStack } from '../data/stack'
import { parseToRoute } from '../utils/parse'
import { ANIMATION_DURATION, STORAGE_KEY_NAME } from '../constants'

export const HybridStackContext = createContext(null)

const HybridStackProvider = ({ children }) => {
  const stackList = useRef<IStack[]>([])
  const beforeHash = useRef<string>('')
  const beforePathname = useRef<string>('')
  const checkHistoryGo = useRef<boolean>(false)

  const [disalbeAni, setDisableAni] = useState(false)

  const [hashStack, setHashStack] = useState<Array<IStack | string>>([])
  const [stack, setStack] = useState<IStack[]>([])
  const [isAddStack, setAddStack] = useState<boolean>()
  const [historyIdx, setHistoryIdx] = useState<number>(0)

  const [isMoveActive, setMoveActive] = useState<boolean>(false)
  const [isMoveAction, setMoveAction] = useState<boolean>(false)
  const [noDimmed, setNoDimmed] = useState(false)

  const addStackList = (data: IStack) => {
    stackList.current = [...stackList.current, data]
  }

  const updateStack = useCallback((to: string | number) => {
    const isToNumber = typeof to === 'number'
    setAddStack(!isToNumber)
    if(isToNumber) {
      if(to < -1) {
        checkHistoryGo.current = true
        setDisableAni(true)
        setTimeout(() => {
          const removedTotalStack = hashStack.slice(hashStack.length + to, hashStack.length)
          const removedHashSize = removedTotalStack.filter((stack) => typeof stack === 'string').length

          setStack(stack.slice(0, stack.length + to + removedHashSize))
          setHashStack(hashStack.slice(0, hashStack.length + to))
        }, 50)
      } else {
        setStack(stack.slice(0, stack.length - 1))
        setHashStack(hashStack.slice(0, hashStack.length - 1))
      }
    } else {
      const stackData = stackList.current.find(({ route }) => route === parseToRoute(to))
      setStack([...stack, stackData])
      setHashStack([...hashStack, stackData])
    }
  }, [hashStack])


  const checkIsForward = () => {
    const { state } = window.history
    if (!state) window.history.replaceState.call(history, { index: historyIdx + 1 }, document.title)
    const index = state ? state.index : historyIdx + 1
    setHistoryIdx(index)

    return index > historyIdx
  }

  const historyBackStack = () => {
    const { pathname, hash } = window.location
    const bPath = beforePathname.current
    const bHash = beforeHash.current
    const historyGo = checkHistoryGo.current
    
    beforeHash.current = hash
    beforePathname.current = pathname
    checkHistoryGo.current = false
    
    if(historyGo) {
      setTimeout(() => {
        setDisableAni(false)
      }, ANIMATION_DURATION)
      return
    }

    if(pathname === bPath) {
      if(hash && !bHash) {
        setHashStack([...hashStack, hash])
      }
      if(hash && bHash) {
        if(hashStack[hashStack.length - 2] === hash) {
          setHashStack(hashStack.slice(0, hashStack.length - 1))
        } else {
          setHashStack([...hashStack, hash])
        }
      }
      if(bHash && !hash) {
        setHashStack(hashStack.slice(0, hashStack.length - 1))
      }
    }
    
    if(pathname === bPath && (hash || (!hash && bHash))) return

    updateStack(checkIsForward() ? window.location.pathname : -1)
  }

  const initStorageStackData = () => {
    const { pathname, hash } = window.location
    const storageData = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY_NAME))
    if(!storageData || storageData.length === 0) return

    const cacheRouteStack = storageData.filter((d: IStack | string) => typeof d !== 'string')
    const cacheStack = cacheRouteStack.map(({ route }) => {
      return stackList.current.find(({ route: CompRoute }) => CompRoute === parseToRoute(route))
    })
    const cacheTotalStack = storageData.map((d: IStack | string) => {
      return typeof d === 'string'
        ? d
        : stackList.current.find(({ route: CompRoute }) => CompRoute === parseToRoute(d.route))
    })
    const hashStack = storageData.filter((d: IStack | string) => typeof d === 'string')

    const isMatchStack = (() => {
      if(!cacheStack[cacheStack.length - 1]) return true
      if(cacheStack[cacheStack.length - 1].route === pathname) return true
    })()

    const isMatchHashStack = (() => {
      if(!hashStack[hashStack.length - 1]) return true
      if(hashStack[hashStack.length - 1] === hash) return true
    })()

    if(!isMatchStack || !isMatchHashStack)  return false
    
    setHashStack(cacheTotalStack)
    setStack(cacheStack)
    setDisableAni(true)
    setTimeout(() => {
      setDisableAni(false)
    }, ANIMATION_DURATION)

    return true
  }

  useEffect(() => {
    if(isAddStack === null) return
    setMoveActive(true)
    setTimeout(() => {
      setMoveAction(true)
      setTimeout(() => {
        setMoveActive(false)
        setMoveAction(false)
      }, ANIMATION_DURATION)
    }, 20)
  }, [stack])

  useEffect(() => {
    const storageData = hashStack.map((d) => typeof d === 'string' ? d : { route: d.route })
    window.sessionStorage.setItem(STORAGE_KEY_NAME, JSON.stringify(storageData))
  }, [hashStack])

  useEffect(() => {
    beforePathname.current = window.location.pathname
    window.addEventListener('popstate', historyBackStack)
    return () => {
      window.removeEventListener('popstate', historyBackStack)
    }
  }, [hashStack])
  
  useEffect(() => {
    if (!history.state || !('index' in history.state)) {
      history.replaceState({ index: 0, state: history.state }, document.title)
    }
  }, [])

  useLayoutEffect(() => {
    if(initStorageStackData()) return
    updateStack(window.location.pathname)
  }, [])

  const hybridDimmedClassName = () => {
    const customClassName = ['hybrid-dimmed']
    customClassName.push(isAddStack ? 'next' : 'prev')
    if(isMoveAction) customClassName.push('active')
    return customClassName.join(' ')
  }

  const checkDimmed = (animation: AnimationType) => {
    if(animation === AnimationType.ToLeft) return
    setNoDimmed(true)
    setTimeout(() => {
      setNoDimmed(false)
    }, ANIMATION_DURATION)
  }
  
  return (
    <div className="hybrid-webview-stack">
      <HybridStackContext.Provider value={[addStackList, stack, updateStack, hashStack, historyIdx, setHistoryIdx]}>
        {children}
        <TransitionGroup>
          {stack.map(({ component, animation }, i, arr) => {
            const activePage = arr.length - 2
            const activeIdx = arr.length - 1
            const nextAnimation = (i < activeIdx && arr[i + 1]) ? arr[i + 1].animation : false

            return (
              <CSSTransition 
                key={i} 
                timeout={ANIMATION_DURATION + 20} 
                classNames={`hybrid-stack-area hybrid-${AnimationClassName[animation]}`}
                onExit={() => checkDimmed(animation)}
                style={{
                  'transition': `all ${ANIMATION_DURATION/1000}s`
                }}
              >
                <div 
                  data-before-ani={nextAnimation !== false ? AnimationClassName[nextAnimation] : false}
                  data-disable-ani={disalbeAni}
                >
                  { component }
                  {arr[activeIdx].route !== null && !noDimmed && (isAddStack ? activePage === i : activePage + 1 === i) && isMoveActive && (
                    <div 
                      className={hybridDimmedClassName()} 
                      style={{
                        'transition': `all ${ANIMATION_DURATION/1000}s`
                      }}
                    />
                  )}
                </div>
              </CSSTransition>
            )
          })}
        </TransitionGroup>
      </HybridStackContext.Provider>
    </div>
  )
}

export default HybridStackProvider