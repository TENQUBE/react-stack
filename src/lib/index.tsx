import { ReactElement } from 'react'
import { AnimationType } from './interfaces'
import StackProvider from './componets/provider'
import Screen from './componets/screen'
import Link from './componets/link'
import useNavigation, { INavigation, INavigationPushState } from './hooks/useNavigaiton'
import useStacks from './hooks/useStacks'
import { IScreen } from './data/screen'
import './styles/main.scss'

interface IStackProvider {
  duration?: number
  children: ReactElement
}

const ReactStackProvider = ({ duration, children }: IStackProvider) => {
  return (
    <StackProvider duration={duration}>
      {children}
    </StackProvider>
  )
}

export { IStackProvider, Screen, Link, AnimationType, useNavigation, INavigation, INavigationPushState, useStacks, IScreen }
export default ReactStackProvider