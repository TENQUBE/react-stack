import { useContext } from 'react'
import { ReactStackContext } from '../componets/provider'
import { IStack } from '../data/stack'

const useStacks = (): [IStack, IStack | string] => {
  const [_, stack, __, totalStack] = useContext(ReactStackContext)
  
  return [stack, totalStack]
}

export default useStacks