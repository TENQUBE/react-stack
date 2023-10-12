import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { AnimationClassName, AnimationType } from '../interfaces'
import { IStack } from '../data/stack'

export const HybridStackContext = createContext(null)

const HybridStackProvider = ({ children }) => {
  const stackList = useRef<IStack[]>([])
  
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
    setAddStack(!(isToNumber && to < 0))
    if(isToNumber) {
      if(to > 0) return
      setStack(stack.slice(0, stack.length + to))
    } else {
      setStack([...stack, stackList.current.find(({ route }) => route === to)])
    }
  }, [stack])

  const historyBackStack = useCallback(() => {
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
      <HybridStackContext.Provider value={[addStackList, updateStack]}>
        {children}
        <TransitionGroup>
          {stack.map(({ component, animation }, i, arr) => {
            const activePage = arr.length - 2
            const activeIdx = arr.length - 1
            const nextAnimation = i < activeIdx ? arr[i + 1].animation : false

            return (
              <CSSTransition 
                key={i} 
                timeout={250} 
                classNames={`hybrid-stack-area hybrid-${AnimationClassName[animation]}`}
                onExit={() => checkDimmed(animation)}
              >
                <div data-before-ani={nextAnimation !== false ? AnimationClassName[nextAnimation] : false}>
                  { component }
                  {!noDimmed && (isAddStack ? activePage === i : activePage + 1 === i) && isMoveActive && (
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