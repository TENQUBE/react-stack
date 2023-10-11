import { useEffect, useState } from 'react'

export interface IHybridRouter {
  push?: (to: string, state?: unknown) => void
}

const useHybridRouter = (): IHybridRouter => {
  const [router, setRouter] = useState({})

  useEffect(() => {
    setRouter({
      push: (to: string, state = {}) => {
        window.history.pushState(state, '', to)
      }
    })
  }, [])

  return router
}

export default useHybridRouter