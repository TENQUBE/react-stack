import { useContext, useLayoutEffect, useState } from 'react'
import { ReactStackContext } from '../componets/provider'

export interface INavigationPushState {
  clear: boolean
}

export interface INavigation {
  push: (to: string, state?: INavigationPushState) => void
  replace: (to: string) => void
  back: (to?: number) => void
}

const useNavigaiton = (): INavigation => {
  const { stacks, updateStacks, historyIdx, setHistoryIdx } = useContext(ReactStackContext)
  
  return {
    push: (to: string, state: INavigationPushState) => {
      if(state && state.clear) {
        setHistoryIdx(1)
        updateStacks(to, true)
        window.history.go((stacks.length - 1) * -1)
        setTimeout(() => {
          window.history.replaceState({ index: 1 }, '', to)
        }, 20)
        return
      }
      setHistoryIdx(historyIdx + 1)
      updateStacks(to)
      window.history.pushState({ index: historyIdx + 1}, '', to)
    },
    replace: (to: string) => {
      window.history.replaceState({ index: historyIdx }, '', to)
    },
    back: (to = 1) => {
      const toSize = to > 0 ? to * -1 : -1
      if(toSize < -1) {
        setHistoryIdx(historyIdx + toSize)
        updateStacks(toSize)
      }
      window.history.go(toSize)
    }
  }
}

export default useNavigaiton