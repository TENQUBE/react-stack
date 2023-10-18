import { useContext, useLayoutEffect, useState } from 'react'
import { HybridStackContext } from '../componets/provider'

export interface RoutePushState {
  clear: boolean
}

export interface IHybridRouter {
  push: (to: string, state?: RoutePushState) => void
  replaceState: (to: string) => void
  back: (to?: number) => void
}

const useHybridRouter = (): IHybridRouter => {
  const [_, stack, updateStack, ___, historyIdx, setHistoryIdx] = useContext(HybridStackContext)
  const [router, setRouter] = useState<IHybridRouter>()

  useLayoutEffect(() => {
    setRouter({
      push: (to: string, state: RoutePushState) => {
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

export default useHybridRouter