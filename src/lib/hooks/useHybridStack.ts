import { useContext } from 'react'
import { HybridStackContext } from '../componets/provider'
import { IStack } from '../data/stack'

const useHybridStack = (): [IStack, IStack | string] => {
  const [_, stack, __, totalStack] = useContext(HybridStackContext)
  
  return [stack, totalStack]
}

export default useHybridStack