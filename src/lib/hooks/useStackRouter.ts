import { useContext, useLayoutEffect, useState } from 'react'
import { ReactStackContext } from '../componets/provider'

export interface IRoutePushState {
  clear: boolean
}

export interface IStackRouter {
  push: (to: string, state?: IRoutePushState) => void
  replaceState: (to: string) => void
  back: (to?: number) => void
}

const useStackRouter = (): IStackRouter => {
  const [_, stack, updateStack, ___, historyIdx, setHistoryIdx] = useContext(ReactStackContext)
  const [router, setRouter] = useState<IStackRouter>()

  useLayoutEffect(() => {
    setRouter({
      push: (to: string, state: IRoutePushState) => {
        if(state && state.clear) {
          setHistoryIdx(1)
          updateStack(to, true)
          window.history.go((stack.length - 1) * -1)
          setTimeout(() => {
            window.history.replaceState({ index: 1 }, '', to)
          }, 20)
          return
        }
        setHistoryIdx(historyIdx + 1)
        updateStack(to)
        window.history.pushState({ index: historyIdx + 1}, '', to)
      },
      replaceState: (to: string) => {
        window.history.replaceState({ index: historyIdx }, '', to)
      },
      back: (to = 1) => {
        const toSize = to > 0 ? to * -1 : -1
        if(toSize < -1) {
          setHistoryIdx(historyIdx + toSize)
          updateStack(toSize)
        } else {
          setHistoryIdx(historyIdx - 1)
        }
        window.history.go(toSize)
      }
    }) 
  }, [stack, historyIdx])

  return router
}

export default useStackRouter