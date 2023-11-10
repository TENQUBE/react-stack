import { ReactNode, useContext } from 'react'
import { ReactStackContext } from './provider'
import { isHashRoute } from '../utils'
import inMemoryCache from '../utils/inMemoryCache'

interface IProps {
  to: string
  target?: string
  children?: ReactNode
}

const Link = ({ to, target = '_self', children }: IProps) => {
  const { updateStacks } = useContext(ReactStackContext)

  const handleClickPush = (e) => {
    if(target === '_blank') return
    e.preventDefault()
    if(isHashRoute(to)) {
      window.location.hash = String(to)
      return
    }

    const historyIndex = inMemoryCache.getHistoryIndex()
    inMemoryCache.setHistoryIndex(historyIndex + 1)
    updateStacks(to)
    window.history.pushState({ index: historyIndex + 1}, '', to)
  }
  return (
    <a href={to} onClick={handleClickPush} target={target}>
      {children}
    </a>
  )
}

export default Link