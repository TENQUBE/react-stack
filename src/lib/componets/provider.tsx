import { useEffect, useRef, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useLocationHistory } from '@tenqube/location-history'

import { AnimationClassName } from '../interfaces'
import { HybridStackContext } from '..'

const HybridStackProvider = ({ children }) => {
  const stackList = useRef([])
  const [history] = useLocationHistory()

  const [printStack, setPrintStack] = useState([])

  const [isAddStack, setAddStack] = useState<boolean>()
  const [isMoveActive, setMoveActive] = useState<boolean>(false)
  const [isMoveAction, setMoveAction] = useState<boolean>(false)

  useEffect(() => {
    if(history.list.length === 0) return
    setAddStack(history.list.length > printStack.length)
    const list = history.list.map(({ pathname }) => {
      return stackList.current.find(({ route }) => route === pathname)
    })
    setPrintStack(list)
  }, [history])

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
  }, [history])

  const addStackList = (data) => {
    stackList.current = [...stackList.current, data]
  }

  return (
    <HybridStackContext.Provider value={[addStackList]}>
      {children}
      <TransitionGroup>
        {printStack.map(({ component, animation }, i, arr) => {
          const activePage = arr.length - 2
          return (
            <CSSTransition key={i} timeout={250} classNames={`hybrid-${AnimationClassName[animation]}`}>
              <div className={`hybrid-stack-area`}>
                { component }
                {(isAddStack ? activePage === i : activePage + 1 === i) && isMoveActive && (
                  <div className={`hybrid-dimmed ${
                    isAddStack 
                      ? `next ${isMoveAction ? 'active' : ''}`
                      : `prev ${isMoveAction ? 'active' : ''}`
                    }`}
                  />
                )}
              </div>
            </CSSTransition>
          )
        })}
      </TransitionGroup>
    </HybridStackContext.Provider>
  )
}

export default HybridStackProvider