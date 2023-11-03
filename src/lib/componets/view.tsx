import { ReactNode, useEffect, useState } from 'react'

interface IProps {
  children: ReactNode
}

const View = ({ children }: IProps) => {
  const [isMount, setMount] = useState(false)

  useEffect(() => {
    setMount(true)
    return () => {
      setMount(false)
    }
  }, [])
  
  return (
    <div className={isMount ? 'react-stack-screen mount' : 'react-stack-screen'}>
      {children}
    </div>
  )
}

export default View