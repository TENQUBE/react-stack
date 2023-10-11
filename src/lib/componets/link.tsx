import { ReactNode } from 'react'

interface IProps {
  to: string
  target?: string
  state?: unknown
  children?: ReactNode
}

const HybridLink = ({ to, target = '_self', state = {}, children }: IProps) => {
  const handleClickLink = (e) => {
    if(target === '_blank') return
    e.preventDefault()
    window.history.pushState(state, "", to)
  }
  return (
    <a href={to} onClick={handleClickLink} target={target}>
      {children}
    </a>
  )
}

export default HybridLink