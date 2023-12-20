import { useContext } from 'react'
import { ReactStackContext } from '../componets/provider'

export function usePDC() {
  const { isPDC, setPDC, animationDuration, animationDelay } = useContext(ReactStackContext)

  const handleClick = (fnc: any) => {
    if (isPDC) return
    setPDC(true)
    setTimeout(() => {
      setPDC(false)
    }, animationDuration + animationDelay)
    fnc()
  }

  return handleClick
}
