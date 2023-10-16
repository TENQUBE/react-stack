import { useContext, useEffect, useState } from 'react'
import { HybridStackContext } from '../componets/provider'

export interface IHybridRouter {
  push: (to: string) => void
  replaceState: (to: string) => void
  back: (to?: number) => void
}

const useHybridRouter = (): IHybridRouter => {
  const [_, __, updateStack, ___, historyIdx, setHistoryIdx] = useContext(HybridStackContext)
  const [router, setRouter] = useState<IHybridRouter>()

  useEffect(() => {
    setRouter({
      push: (to: string) => {
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
  }, [historyIdx])

  return router
}

export default useHybridRouter