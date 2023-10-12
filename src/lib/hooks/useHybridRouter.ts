import { useContext, useEffect, useState } from 'react'
import { HybridStackContext } from '../componets/provider'

export interface IHybridRouter {
  push?: (to: string) => void
  back?: (to: number) => void
}

const useHybridRouter = (): IHybridRouter => {
  const [_, __, setStack] = useContext(HybridStackContext)
  const [router, setRouter] = useState({})

  useEffect(() => {
    setRouter({
      push: (to: string) => {
        setStack(to)
        window.history.pushState('', '', to)
      },
      back: (to = 1) => {
        if(to <= 0) {
          console.error('error')
          return
        }
        setStack(to)
        window.history.go(to * -1)
      }
    })
  }, [])

  return router
}

export default useHybridRouter