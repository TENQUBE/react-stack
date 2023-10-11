import { createContext } from 'react'
import LocaitonHistoryProvider from '@tenqube/location-history'

import './styles/main.scss'
import { AnimationType } from './interfaces'
import HybridRoute from './componets/route'
import HybridStackProvider from './componets/provider'
import HybridLink from './componets/link'

export const HybridStackContext = createContext(null)

const Index = ({ children }) => {
  return (
    <LocaitonHistoryProvider>
      <HybridStackProvider>
        {children}
      </HybridStackProvider>
    </LocaitonHistoryProvider>
  )
}

export { HybridRoute, HybridLink, AnimationType }
export default Index