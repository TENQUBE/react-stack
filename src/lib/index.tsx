import { AnimationType } from './interfaces'
import ReactStackProvider from './componets/provider'
import Route from './componets/route'
import Link from './componets/link'
import useStackRouter, { IStackRouter } from './hooks/useStackRouter'
import useStacks from './hooks/useStacks'
import { IStack } from './data/stack'
import './styles/main.scss'

const Index = ({ children }) => {
  return (
    <ReactStackProvider>
      {children}
    </ReactStackProvider>
  )
}

export { Route, Link, AnimationType, useStackRouter, IStackRouter, useStacks, IStack }
export default Index