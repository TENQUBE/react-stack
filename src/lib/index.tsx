import { AnimationType } from './interfaces'
import StackProvider from './componets/provider'
import Screen from './componets/screen'
import Link from './componets/link'
import useNavigation, { INavigation, INavigationPushState } from './hooks/useNavigaiton'
import useStacks from './hooks/useStacks'
import { IScreen } from './data/screen'
import './styles/main.scss'

const ReactStackProvider = ({ children }) => {
  return (
    <StackProvider>
      {children}
    </StackProvider>
  )
}

export { Screen, Link, AnimationType, useNavigation, INavigation, INavigationPushState, useStacks, IScreen }
export default ReactStackProvider