import { useContext, useEffect, useState } from 'react'
import { HybridStackContext } from '../componets/provider'

export interface IHybridRouter {
  push: (to: string) => void
  back: (to?: number) => void
}

const useHybridRouter = (): IHybridRouter => {
  const [_, __, setStack] = useContext(HybridStackContext)
  const [router, setRouter] = useState<IHybridRouter>()

  useEffect(() => {
    setRouter({
      push: (to: string) => {
        setStack(to)
        window.history.pushState('', '', to)
      },
      back: (to = 1) => {
        const toSize = to > 0 ? to * -1 : -1
        if(toSize < -1) {
          setStack(toSize)
        }
        window.history.go(toSize)
      }
    }) 
  }, [])

  return router
}

export default useHybridRouter