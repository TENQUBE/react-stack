import { useContext } from 'react'
import { ReactStackContext } from '../componets/provider'
import { IScreen } from '../data/screen'

const useStacks = (): { stacks: IScreen[], allStacks: Array<IScreen | string>} => {
  const { stacks, allStacks } = useContext(ReactStackContext)
  
  return { stacks, allStacks }
}

export default useStacks