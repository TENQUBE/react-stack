import { createContext, useEffect, useRef, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { ILocationHistory, useLocationHistory } from '@tenqube/location-history'

import { AnimationClassName, AnimationType } from '../interfaces'
import { IStack } from '../data/stack'

export const HybridStackContext = createContext(null)

const HybridStackProvider = ({ children }) => {
  const stackList = useRef<IStack[]>([])
  const history: ILocationHistory = useLocationHistory()

  const [printStack, setPrintStack] = useState([])
  const [noDimmed, setNoDimmed] = useState(false)

  const [isAddStack, setAddStack] = useState<boolean>()
  const [isMoveActive, setMoveActive] = useState<boolean>(false)
  const [isMoveAction, setMoveAction] = useState<boolean>(false)

  useEffect(() => {
    if(history.list.length === 0) return
    setAddStack(history.list.length > printStack.length)
    setPrintStack(history.list.map(({ pathname }) => {
      return stackList.current.find(({ route }) => route === pathname)
    }))
  }, [history])

  useEffect(() => {
    if(isAddStack === null) return
    setMoveActive(true)
    setTimeout(() => {
      setMoveAction(true)
      setTimeout(() => {
        setMoveActive(false)
        setMoveAction(false)
      }, 300)
    }, 20)
  }, [history])

  const addStackList = (data: IStack) => {
    stackList.current = [...stackList.current, data]
  }

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
    }, 300)
  }

  useEffect(() => {
    console.log(printStack)
  }, [printStack])

  return (
    <div className="hybrid-webview-stack">
      <HybridStackContext.Provider value={[addStackList]}>
        {children}
        <TransitionGroup>
          {printStack.map(({ component, animation }, i, arr) => {
            const activePage = arr.length - 2
            const activeIdx = arr.length - 1
            const nextAnimation = i < activeIdx ? arr[i + 1].animation : false

            return (
              <CSSTransition 
                key={i} 
                timeout={300} 
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