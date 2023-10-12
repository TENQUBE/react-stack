import { useContext } from 'react'
import { HybridStackContext } from '../componets/provider'
import { IStack } from '../data/stack'

const useHybridStack = (): IStack[] => {
  const [_, stack] = useContext(HybridStackContext)
  
  return stack
}

export default useHybridStack