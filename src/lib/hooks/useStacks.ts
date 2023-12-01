import { useContext } from 'react'
import { ReactStackContext } from '../componets/provider'
import { IScreen } from '../data/screen'

const useStacks = (): IScreen[] => {
  const { stacks } = useContext(ReactStackContext)

  return stacks
}

export default useStacks
