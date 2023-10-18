import { ReactNode, useContext, useLayoutEffect } from 'react'

import { HybridStackContext } from './provider'
import Stack from '../data/stack'
import { AnimationType } from '../interfaces'

interface IProps {
  route: string
  component: ReactNode
  animation?: AnimationType
}

const HybridRoute = ({ route, component, animation }: IProps) => {
  const [addStackList] = useContext(HybridStackContext)

  useLayoutEffect(() => {
    addStackList(new Stack({ route, component, animation }))
  }, [])

  return null
}

export default HybridRoute