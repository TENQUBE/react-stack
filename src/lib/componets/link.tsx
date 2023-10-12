import { ReactNode, useContext } from 'react'
import { HybridStackContext } from './provider'

interface IProps {
  to: string
  target?: string
  children?: ReactNode
}

const HybridLink = ({ to, target = '_self', children }: IProps) => {
  const [_, __, setStack] = useContext(HybridStackContext)

  const handleClickLink = (e) => {
    if(target === '_blank') return
    e.preventDefault()
    setStack(to)
    window.history.pushState('', '', to)
  }
  return (
    <a href={to} onClick={handleClickLink} target={target}>
      {children}
    </a>
  )
}

export default HybridLink