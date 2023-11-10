import { usePreventionDoubleClick } from './recoils/preventionDoubleClick'

export function usePDC() {
  const [isDisabled, setDisable] = usePreventionDoubleClick()

  const handleClick = (fnc: any) => {
    if(isDisabled) return
    setDisable(true)
    setTimeout(() => {
      setDisable(false)
    }, 300)
    fnc()
  }

  return handleClick
}