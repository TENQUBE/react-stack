import { useContext } from 'react'
import { ReactStackContext } from '../componets/provider'
import { isHashRoute } from '../utils'
import inMemoryCache from '../utils/inMemoryCache'

export interface INavigationPushState {
  clear: boolean
}

export interface INavigation {
  push: (to: string, state?: INavigationPushState) => void
  replace: (to: string) => void
  back: (to?: number) => void
}



const useNavigaiton = (): INavigation => {
  const { updateStacks, animationDuration, animationDelay } = useContext(ReactStackContext)

  return {
    push: (to: string, state: INavigationPushState) => {
      return new Promise((resolve) => {
        const historyIndex = inMemoryCache.getHistoryIndex()

        if(isHashRoute(to)) {
          window.location.hash = String(to)
          return setTimeout(() => {
            resolve(null)
          }, animationDuration + animationDelay + 10)
        }
  
        if(state?.clear) {
          const stackLen = inMemoryCache.getScreens().length
          updateStacks(to, true)
          window.history.go((stackLen - 1) * -1)
          return setTimeout(() => {
            resolve(null)
          }, animationDuration + animationDelay + 10)
        }

        inMemoryCache.setHistoryIndex(historyIndex + 1)
        updateStacks(to)
        window.history.pushState({ index: historyIndex + 1 }, '', to)
        return setTimeout(() => {
          resolve(null)
        }, animationDuration + animationDelay + 10)
      })
    },
    replace: (to: string) => {
      const historyIndex = inMemoryCache.getHistoryIndex()
      window.history.replaceState({ index: historyIndex }, '', to)
    },
    back: (to = 1) => {
      return new Promise((resolve) => {
        const toSize = to > 0 ? to * -1 : -1
        if(toSize < -1) {
          updateStacks(toSize)
        }
        window.history.go(toSize)
        return setTimeout(() => {
          resolve(null)
        }, animationDuration + 10)
      })
    }
  }
}

export default useNavigaiton