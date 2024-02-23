import { useContext } from 'react'
import { ReactStackContext } from '../componets/provider'
import { isHashRoute } from '../utils'
import inMemoryCache from '../utils/inMemoryCache'
import useLoading from './useLoading'

export interface INavigationPushState {
  clear: boolean
}

export const DELAY_MARGIN = 10

export interface INavigation {
  push: (to: string, state?: INavigationPushState) => void
  replace: (to: string) => void
  back: (to?: number) => void
}

const useNavigaiton = (): INavigation => {
  const { updateStacks, changeLastScreen, animationDuration, animationDelay } =
    useContext(ReactStackContext)
  const startLoading = useLoading()

  return {
    push: (to: string, state: INavigationPushState) => {
      return new Promise((resolve) => {
        const historyIndex = inMemoryCache.getHistoryIndex()

        if (isHashRoute(to)) {
          window.location.hash = String(to)
          return setTimeout(() => {
            resolve(null)
          }, DELAY_MARGIN)
        }

        if (state?.clear) {
          const stackLen = inMemoryCache.getScreens().length
          startLoading()
          updateStacks(to, true)
          inMemoryCache.setHistoryIndex(historyIndex + 1)
          window.history.pushState({ index: historyIndex + 1 }, '', to)
          return setTimeout(() => {
            resolve(null)
            inMemoryCache.setHistoryIndex(1)
            window.history.go(stackLen * -1)
          }, animationDuration + animationDelay + DELAY_MARGIN)
        }

        startLoading()
        updateStacks(to)
        inMemoryCache.setHistoryIndex(historyIndex + 1)
        window.history.pushState({ index: historyIndex + 1 }, '', to)
        return setTimeout(() => {
          resolve(null)
        }, animationDuration * 2 + animationDelay + DELAY_MARGIN)
      })
    },
    replace: (to: string) => {
      return new Promise((resolve) => {
        startLoading()
        changeLastScreen(to)
        window.history.replaceState({ index: inMemoryCache.getHistoryIndex() }, '', to)
        return setTimeout(() => {
          resolve(null)
        }, animationDuration + animationDelay + DELAY_MARGIN)
      })
    },
    back: (to = 1) => {
      return new Promise((resolve) => {
        const stackLen = inMemoryCache.getScreens().length
        const positiveTo = to > 0 ? to : to * -1
        const toSize = stackLen > positiveTo ? positiveTo * -1 : (stackLen - 1) * -1
        if (toSize < -1) {
          updateStacks(toSize)
        }
        window.history.go(toSize)
        return setTimeout(() => {
          resolve(null)
        }, animationDuration + DELAY_MARGIN)
      })
    }
  }
}

export default useNavigaiton
