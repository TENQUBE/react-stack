import { AnimationType } from './interfaces'
import HybridStackProvider from './componets/provider'
import HybridRoute from './componets/route'
import HybridLink from './componets/link'
import useHybridRouter, { IHybridRouter } from './hooks/useHybridRouter'
import useHybridStack from './hooks/useHybridStack'
import { IStack } from './data/stack'
import './styles/main.scss'

const Index = ({ children }) => {
  return (
    <HybridStackProvider>
      {children}
    </HybridStackProvider>
  )
}

export { HybridRoute, HybridLink, AnimationType, useHybridRouter, IHybridRouter, useHybridStack, IStack }
export default Index