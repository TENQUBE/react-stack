import './styles/main.scss'
import { AnimationType } from './interfaces'
import HybridRoute from './componets/route'
import HybridStackProvider from './componets/provider'
import HybridLink from './componets/link'
import useHybridRouter, { IHybridRouter } from './hooks/useHybridRouter'

const Index = ({ children }) => {
  return (
    <HybridStackProvider>
      {children}
    </HybridStackProvider>
  )
}

export { HybridRoute, HybridLink, AnimationType, useHybridRouter, IHybridRouter }
export default Index