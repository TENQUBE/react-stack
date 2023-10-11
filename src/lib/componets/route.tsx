import { useContext } from 'react'

import { HybridStackContext } from './provider'
import Stack from '../data/stack'

const HybridRoute = ({ route, component, animation }) => {
  const [addStackList] = useContext(HybridStackContext)
  addStackList(new Stack({ route, component, animation }))
  
  return null
}

export default HybridRoute