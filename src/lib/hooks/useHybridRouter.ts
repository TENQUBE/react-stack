import { useContext, useEffect, useState } from 'react'
import { HybridStackContext } from '../componets/provider'

export interface IHybridRouter {
  push?: (to: string) => void
  go?: (to: number) => void
}

const useHybridRouter = (): IHybridRouter => {
  const [_, setStack] = useContext(HybridStackContext)
  const [router, setRouter] = useState({})

  useEffect(() => {
    setRouter({
      push: (to: string) => {
        setStack(to)
        window.history.pushState('', '', to)
      },
      go: (to: number) => {
        if(typeof to !== 'number' || to >= 0) {
          console.error('Currently the go method only supports going back. (negative number)')
          return
        }
        setStack(to)
        window.history.go(to)
      }
    })
  }, [])

  return router
}

export default useHybridRouter