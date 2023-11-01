import { ReactElement, useContext, useLayoutEffect } from 'react'
import { ReactStackContext } from './provider'
import ScreenObj from '../data/screen'
import { AnimationType } from '../interfaces'

interface IProps {
  route: string
  component: ReactElement
  animation?: AnimationType
}

const Screen = ({ route, component, animation }: IProps) => {
  const { addScreen } = useContext(ReactStackContext)

  useLayoutEffect(() => {
    addScreen(new ScreenObj({ route, component, animation }))
  }, [])

  return null
}

export default Screen