import { ReactNode, useContext, useLayoutEffect } from 'react'

import { ReactStackContext } from './provider'
import Stack from '../data/stack'
import { AnimationType } from '../interfaces'

interface IProps {
  route: string
  component: ReactNode
  animation?: AnimationType
}

const Route = ({ route, component, animation }: IProps) => {
  const [addStackList] = useContext(ReactStackContext)

  useLayoutEffect(() => {
    addStackList(new Stack({ route, component, animation }))
  }, [])

  return null
}

export default Route