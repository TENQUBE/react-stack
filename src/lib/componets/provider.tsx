import { cloneElement, createContext, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { ANIMATION_DURATION, STORAGE_KEY_NAME } from '../constants'
import { AnimationClassName, AnimationType } from '../interfaces'
import { matchRouteToPathname, matchSingleRoute } from '../utils'
import { IScreen } from '../data/screen'

export const ReactStackContext = createContext(null)

const StackProvider = ({ children }) => {
  const screenList = useRef<IScreen[]>([])
  const beforeHash = useRef<string>('')
  const beforePathname = useRef<string>('')
  const checkHistoryGo = useRef<boolean>(false)
  const aniDuration = useRef<number>(ANIMATION_DURATION)

  const [allStacks, setAllStacks] = useState<Array<IScreen | string>>([])
  const [stacks, setStacks] = useState<IScreen[]>([])
  const [isAddStack, setAddStack] = useState<boolean>(null)
  const [historyIdx, setHistoryIdx] = useState<number>(0)

  const [isMoveActive, setMoveActive] = useState<boolean>(false)
  const [isMoveAction, setMoveAction] = useState<boolean>(false)
  const [noDimmed, setNoDimmed] = useState(false)

  const addScreen = useCallback((data: IScreen) => {
    screenList.current = [...screenList.current, data]
  }, [])

  const breakAnimation = useCallback(() => {
    aniDuration.current = 0
    setTimeout(() => {
      aniDuration.current = ANIMATION_DURATION
    }, ANIMATION_DURATION)
  }, [])

  const updateStacks = useCallback((to: string | number, isClear = false) => {
    if(isClear && typeof to === 'string') {
      checkHistoryGo.current = true
      breakAnimation()

      setTimeout(() => {
        const stackData = matchRouteToPathname(screenList.current, to)
        setStacks([stackData])
        setAllStacks([stackData])
      }, 20)
      return
    }

    const isToNumber = typeof to === 'number'
    setAddStack(!isToNumber)
    if(isToNumber) {
      if(to < -1) {
        checkHistoryGo.current = true
        breakAnimation()

        setTimeout(() => {
          const removedTotalStack = allStacks.slice(allStacks.length + to, allStacks.length)
          const removedHashSize = removedTotalStack.filter((stack) => typeof stack === 'string').length

          setStacks(stacks.slice(0, stacks.length + to + removedHashSize))
          setAllStacks(allStacks.slice(0, allStacks.length + to))
        }, 20)
      } else {
        setStacks(stacks.slice(0, stacks.length - 1))
        setAllStacks(allStacks.slice(0, allStacks.length - 1))
      }
    } else {
      const stackData = matchRouteToPathname(screenList.current, to)
      setStacks([...stacks, stackData])
      setAllStacks([...allStacks, stackData])
    }
  }, [stacks, allStacks])


  const checkIsForward = useCallback(() => {
    const { state } = window.history
    if (!state) window.history.replaceState({ index: historyIdx + 1 }, '')

    const index = state ? state.index : historyIdx + 1
    const isForward = index > historyIdx
    setHistoryIdx(index)

    return isForward
  }, [historyIdx])

  const historyChangeStack = useCallback(() => {
    if(checkHistoryGo.current) {
      checkHistoryGo.current = false
      return
    }

    const { pathname, hash } = window.location
    const bPath = beforePathname.current
    const bHash = beforeHash.current
    
    beforeHash.current = hash
    beforePathname.current = pathname

    if(pathname === bPath) {
      if(hash && !bHash) {
        setAllStacks([...allStacks, hash])
        return
      }
      if(hash && bHash) {
        if(allStacks[allStacks.length - 2] === hash) {
          setAllStacks(allStacks.slice(0, allStacks.length - 1))
        } else {
          setAllStacks([...allStacks, hash])
        }
        return
      }
      if(bHash && !hash) {
        setAllStacks(allStacks.slice(0, allStacks.length - 1))
        return
      }
    }
    
    updateStacks(checkIsForward() ? pathname : -1)
  }, [allStacks, historyIdx])

  const initStorageStackData = useCallback(() => {
    const { pathname, hash } = window.location
    const storageData = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY_NAME))
    if(!storageData || storageData.length === 0) return

    const cacheRouteStack = storageData.filter((d: IScreen | string) => typeof d !== 'string')
    const cacheStack = cacheRouteStack.map(({ route }) => {
      return matchRouteToPathname(screenList.current, route)
    })
    const cacheTotalStack = storageData.map((d: IScreen | string) => {
      return typeof d === 'string'
        ? d
        : matchRouteToPathname(screenList.current, d.route)
    })
    const allStack = storageData.filter((d: IScreen | string) => typeof d === 'string')

    const isMatchStack = (() => {
      if(!cacheStack[cacheStack.length - 1]) return true
      if(matchSingleRoute(cacheStack[cacheStack.length - 1], pathname)) return true
      return false
    })()

    const isMatchallStack = (() => {
      if(!allStack[allStack.length - 1]) return true
      if(allStack[allStack.length - 1] === hash) return true
      return false
    })()

    if(!isMatchStack || !isMatchallStack)  return false
    
    breakAnimation()
    setAllStacks(cacheTotalStack)
    setStacks(cacheStack)
  
    return true
  }, [allStacks, historyIdx])

  useEffect(() => {
    if(isAddStack === null) return
    setMoveActive(true)
    setTimeout(() => {
      setMoveAction(true)
      setTimeout(() => {
        setMoveActive(false)
        setMoveAction(false)
      }, aniDuration.current)
    }, 20)
  }, [stacks])

  useEffect(() => { 
    const storageData = allStacks.map((d) => typeof d === 'string' ? d : { route: d.route })
    window.sessionStorage.setItem(STORAGE_KEY_NAME, JSON.stringify(storageData))
  }, [allStacks])

  useEffect(() => {
    beforePathname.current = window.location.pathname
    window.addEventListener('popstate', historyChangeStack)
    return () => {
      window.removeEventListener('popstate', historyChangeStack)
    }
  }, [allStacks, historyIdx])
  
  useEffect(() => {
    const index = window.history?.state?.index
    if(index) {
      setHistoryIdx(index)
    } else {
      history.replaceState({ index: 0 }, '')
    }
  }, [])

  useLayoutEffect(() => {
    if(initStorageStackData()) return
    updateStacks(window.location.pathname)
  }, [])

  const dimmedClassName = useCallback(() => {
    const customClassName = ['react-stack-dimmed']
    customClassName.push(isAddStack ? 'next' : 'prev')
    if(isMoveAction) customClassName.push('active')
    return customClassName.join(' ')
  }, [isAddStack, isMoveAction])

  const checkDimmed = useCallback((animation: AnimationType) => {
    if(animation === AnimationType.ToLeft) return
    setNoDimmed(true)
    setTimeout(() => {
      setNoDimmed(false)
    }, ANIMATION_DURATION)
  }, [])
  
  return (
    <div className="react-stack-area">
      <ReactStackContext.Provider value={{addScreen, stacks, allStacks, updateStacks, historyIdx, setHistoryIdx}}>
        {children}
        <TransitionGroup>
          {stacks.map(({ route, component, animation, pathVariable }, i, arr) => {
            if(route === '#') return null
            const activePage = arr.length - 2
            const activeIdx = arr.length - 1
            const nextAnimation = (i < activeIdx && arr[i + 1]) ? arr[i + 1].animation : false

            return (
              <CSSTransition 
                key={i} 
                timeout={aniDuration.current} 
                classNames={`react-stack-box react-stack-${AnimationClassName[animation]}`}
                onExit={() => checkDimmed(animation)}
                style={{
                  'transition': `all ${aniDuration.current/1000}s`
                }}
              >
                <div data-before-ani={nextAnimation !== false ? AnimationClassName[nextAnimation] : false}>
                  { cloneElement(component, {...{ params: pathVariable }}) }
                  {arr[activeIdx].route !== null && !noDimmed && (isAddStack ? activePage === i : activePage + 1 === i) && isMoveActive && (
                    <div 
                      className={dimmedClassName()} 
                      style={{
                        'transition': `all ${aniDuration.current/1000}s`
                      }}
                    />
                  )}
                </div>
              </CSSTransition>
            )
          })}
        </TransitionGroup>
      </ReactStackContext.Provider>
    </div>
  )
}

export default StackProvider