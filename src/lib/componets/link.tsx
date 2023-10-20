import { ReactNode, useContext } from 'react'
import { ReactStackContext } from './provider'

interface IProps {
  to: string
  target?: string
  children?: ReactNode
}

const Link = ({ to, target = '_self', children }: IProps) => {
  const { updateStacks, historyIdx, setHistoryIdx } = useContext(ReactStackContext)

  const handleClickPush = (e) => {
    if(target === '_blank') return
    e.preventDefault()
    setHistoryIdx(historyIdx + 1)
    updateStacks(to)
    window.history.pushState({ index: historyIdx + 1}, '', to)
  }
  return (
    <a href={to} onClick={handleClickPush} target={target}>
      {children}
    </a>
  )
}

export default Link