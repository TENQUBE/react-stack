import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { AnimationClassName, AnimationType } from '../interfaces'
import Stack, { IStack } from '../data/stack'

export const HybridStackContext = createContext(null)

const HybridStackProvider = ({ children }) => {
  const basePathname = useRef<string>('')
  const stackList = useRef<IStack[]>([])
  const hashStack = useRef<string[]>([])

  const [stack, setStack] = useState<IStack[]>([])
  const [isAddStack, setAddStack] = useState<boolean>()

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
      setStack(stack.slice(0, stack.length + to))
    } else {
      setStack([...stack, stackList.current.find(({ route }) => route === to)])
    }
  }, [stack])

  const historyBackStack = useCallback((event) => {
    const hash = window.location.hash
    if(basePathname.current === window.location.pathname && event.state === null && hash) {
      if(hashStack.current.length === 0 || hashStack.current[hashStack.current.length - 2] !== hash) {
        event.preventDefault()
        hashStack.current = [...hashStack.current, hash]
        setStack([...stack, new Stack({ route: null, component: <></>, animation: AnimationType.None })])
        return false
      } else {
        hashStack.current = hashStack.current.slice(0, hashStack.current.length - 1)
        updateStack(-1)
        return false
      }
    }
    if(hashStack.current.length) hashStack.current = []
    updateStack(-1)
  }, [stack])

  useEffect(() => {
    if(isAddStack === null) return
    setMoveActive(true)
    setTimeout(() => {
      setMoveAction(true)
      setTimeout(() => {
        setMoveActive(false)
        setMoveAction(false)
      }, 230)
    }, 20)
  }, [stack])

  useEffect(() => {
    basePathname.current = window.location.pathname
    window.addEventListener('popstate', historyBackStack)
    return () => {
      window.removeEventListener('popstate', historyBackStack)
    }
  }, [stack])
  
  useEffect(() => {
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
    }, 250)
  }
  
  return (
    <div className="hybrid-webview-stack">
      <HybridStackContext.Provider value={[addStackList, stack, updateStack]}>
        {children}
        <TransitionGroup>
          {stack.map(({ component, animation }, i, arr) => {
            const activePage = arr.length - 2
            const activeIdx = arr.length - 1
            const nextAnimation = (i < activeIdx && arr[i + 1]) ? arr[i + 1].animation : false

            return (
              <CSSTransition 
                key={i} 
                timeout={250} 
                classNames={`hybrid-stack-area hybrid-${AnimationClassName[animation]}`}
                onExit={() => checkDimmed(animation)}
              >
                <div data-before-ani={nextAnimation !== false ? AnimationClassName[nextAnimation] : false}>
                  { component }
                  {arr[activeIdx].route !== null && !noDimmed && (isAddStack ? activePage === i : activePage + 1 === i) && isMoveActive && (
                    <div className={hybridDimmedClassName()} />
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