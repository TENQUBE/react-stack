import { createContext, useContext, useEffect, useState } from 'react'
import Stack from './data/stack'
import { AnimationType } from './interfaces'

const HybridStackContext = createContext(null)

const HybridRoute = ({ route, component, animation }) => {
  const [stacks, setStacks] = useContext(HybridStackContext)
  
  useEffect(() => {
    setStacks([
      ...stacks, 
      new Stack({ route, component, animation })
    ])
  }, [])

  return null
}

const HybridStackProvider = ({ children }) => {
  const [stacks, setStacks] = useState([])

  useEffect(() => {
    console.log(stacks)
  }, [stacks])
  
  return (
    <HybridStackContext.Provider value={[stacks, setStacks]}>
      {children}
    </HybridStackContext.Provider>
  )
}

export { HybridRoute, AnimationType }
export default HybridStackProvider