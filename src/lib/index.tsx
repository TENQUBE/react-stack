import { RecoilRoot } from 'recoil'
import { AnimationType } from './interfaces'
import StackProvider from './componets/provider'
import Screen from './componets/screen'
import Link from './componets/link'
import BottomSheet from './componets/bottomsheet'
import Toast from './componets/toast'
import useNavigation, { INavigation, INavigationPushState } from './hooks/useNavigaiton'
import useStacks from './hooks/useStacks'
import { IScreen } from './data/screen'
import './styles/main.scss'

interface IStackProvider {
  duration?: number
  delay?: number
  children: any
}

const ReactStackProvider = ({ duration, delay, children }: IStackProvider) => {
  return (
    <RecoilRoot>
      <StackProvider duration={duration} delay={delay}>
        {children}
      </StackProvider>
    </RecoilRoot>
  )
}

export { IStackProvider, Screen, BottomSheet, Toast, Link, AnimationType, useNavigation, INavigation, INavigationPushState, useStacks, IScreen }
export default ReactStackProvider