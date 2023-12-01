import { useContext } from 'react'
import { ReactStackContext } from '../componets/provider'

export function usePDC() {
  const { isPDC, setPDC } = useContext(ReactStackContext)

  const handleClick = (fnc: any) => {
    if (isPDC) return
    setPDC(true)
    setTimeout(() => {
      setPDC(false)
    }, 300)
    fnc()
  }

  return handleClick
}
