import { useContext } from 'react'
import { ReactStackContext } from '../componets/provider'

export default function useLoading(): () => void {
  const { progressIndicator, setLoading } = useContext(ReactStackContext)

  return () => {
    if (!progressIndicator) return
    setLoading(true)
  }
}
