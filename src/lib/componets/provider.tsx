import { cloneElement, createContext, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { ANIMATION_DURATION, STORAGE_KEY_NAME } from '../constants'
import { AnimationClassName, AnimationType } from '../interfaces'
import { isHashRoute, matchLastSingleRoute, matchRouteToPathname } from '../utils'
import Screen, { IScreen } from '../data/screen'

export const ReactStackContext = createContext(null)

const StackProvider = ({ children }) => {
  const screenList = useRef<IScreen[]>([])
  const beforeHash = useRef<string>('')
  const beforePathname = useRef<string>('')
  const checkHistoryGo = useRef<boolean>(false)

  const [stacks, setStacks] = useState<IScreen[]>([])
  const [isAddStack, setAddStack] = useState<boolean>(null)
  const [historyIdx, setHistoryIdx] = useState<number>(0)

  const [aniDuration, setAniDuration] = useState<number>(ANIMATION_DURATION)
  const [isMoveActive, setMoveActive] = useState<boolean>(false)
  const [isMoveAction, setMoveAction] = useState<boolean>(false)
  const [noDimmed, setNoDimmed] = useState(false)

  const addScreen = useCallback((data: IScreen) => {
    screenList.current = [...screenList.current, data]
  }, [])

  const breakAnimation = useCallback(() => {
    setAniDuration(0)
    setTimeout(() => {
      setAniDuration(ANIMATION_DURATION)
    }, ANIMATION_DURATION)
  }, [])

  const updateStacks = useCallback((to: string | number, isClear = false) => {
    if(isClear && typeof to === 'string') {
      checkHistoryGo.current = true
      breakAnimation()
      setTimeout(() => {
        const stackData = matchRouteToPathname(screenList.current, to)
        setStacks([stackData])
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
          setStacks(stacks.slice(0, stacks.length + to))
        }, 20)
      } else {
        setStacks(stacks.slice(0, stacks.length - 1))
      }
    } else {
      const stackData = matchRouteToPathname(screenList.current, to)
      setStacks([...stacks, stackData])
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

    breakAnimation()
    setStacks(storageStacks)
  
    return true
  }, [stacks, historyIdx])

  useEffect(() => {
    if(isAddStack === null) return
    setMoveActive(true)
    setTimeout(() => {
      setMoveAction(true)
      setTimeout(() => {
        setMoveActive(false)
        setMoveAction(false)
      }, aniDuration)
    }, 20)
  }, [stacks, aniDuration])

  useEffect(() => { 
    const storageData = stacks.map((d) => d.route)
    window.sessionStorage.setItem(STORAGE_KEY_NAME, JSON.stringify(storageData))
  }, [stacks])

  useEffect(() => {
    beforePathname.current = window.location.pathname
    window.addEventListener('popstate', historyChangeStack)
    return () => {
      window.removeEventListener('popstate', historyChangeStack)
    }
  }, [stacks, historyIdx])
  
  useEffect(() => {
    const index = window.history?.state?.index
    if(index) {
      setHistoryIdx(index)
    } else {
      window.history.replaceState({ index: 0 }, '')
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
      <ReactStackContext.Provider value={{addScreen, stacks, updateStacks, historyIdx, setHistoryIdx}}>
        {children}
        <TransitionGroup>
          {stacks.map(({ route, component, animation, pathVariable }, i, arr) => {
            if(isHashRoute(route)) return null
            const activePage = arr.length - 2
            const activeIdx = arr.length - 1
            const nextAnimation = (i < activeIdx && arr[i + 1]) ? arr[i + 1].animation : false

            return (
              <CSSTransition 
                key={i} 
                timeout={aniDuration} 
                classNames={`react-stack-box react-stack-${AnimationClassName[animation]}`}
                onExit={() => checkDimmed(animation)}
                style={{
                  'transition': `all ${aniDuration/1000}s`
                }}
              >
                <div data-before-ani={nextAnimation !== false ? AnimationClassName[nextAnimation] : false}>
                  { cloneElement(component, {...{ params: pathVariable }}) }
                  {!isHashRoute(arr[activeIdx].route) && !noDimmed && (isAddStack ? activePage === i : activePage + 1 === i) && isMoveActive && (
                    <div 
                      className={dimmedClassName()} 
                      style={{
                        'transition': `all ${aniDuration/1000}s`
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