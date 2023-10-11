import LocaitonHistoryProvider, { useLocationHistory, ILocationHistory, ILocationVO } from '@tenqube/location-history'

import './styles/main.scss'
import { AnimationType } from './interfaces'
import HybridRoute from './componets/route'
import HybridStackProvider from './componets/provider'
import HybridLink from './componets/link'

const Index = ({ children }) => {
  return (
    <LocaitonHistoryProvider>
      <HybridStackProvider>
        {children}
      </HybridStackProvider>
    </LocaitonHistoryProvider>
  )
}

export { HybridRoute, HybridLink, AnimationType, useLocationHistory, ILocationHistory, ILocationVO }
export default Index