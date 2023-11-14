import { ReactElement, cloneElement, useContext, useEffect, useState } from 'react'
import Lottie from "lottie-react"
import loadingLottie from '../images/loading.json'

import { ReactStackContext } from './provider'

export default function Loading ({ loadingComp }: { loadingComp: ReactElement }) {
  const { isLoading, setLoading, animationDuration, animationDelay } = useContext(ReactStackContext)

  const [active, setActive] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if(isLoading) {
      setActive(true)
      setTimeout(() => {
        setDone(true)
        setTimeout(() => {
          setLoading(false)
        }, 150)
      }, (animationDuration * 1.5) + animationDelay)
    } else {
      setActive(false)
      setDone(false)
    }
  }, [isLoading])

  const classNameGenerator = () => {
    const className = ['react-stack-prgoress-area']
    if(isLoading) className.push('enter')
    if(active) className.push('active')
    if(done) className.push('done')
    return className.join(' ')
  }

  return (
    <div className={classNameGenerator()}>
      { loadingComp ? cloneElement(loadingComp) : <Lottie animationData={loadingLottie} loop={true} /> }
    </div>
  )
}