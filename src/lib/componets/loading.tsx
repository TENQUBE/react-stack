import { ReactElement, cloneElement, useContext, useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import loadingLottie from '../images/loading.json'

import { ReactStackContext } from './provider'

const DELAY_MARGIN = 100

export default function Loading({ loadingComp }: { loadingComp: ReactElement }) {
  const { isLoading, setLoading, animationDelay } = useContext(ReactStackContext)

  const [active, setActive] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setActive(true)
      setTimeout(() => {
        setDone(true)
        setTimeout(() => {
          setLoading(false)
        }, 150)
      }, animationDelay + DELAY_MARGIN)
    } else {
      setActive(false)
      setDone(false)
    }
  }, [isLoading])

  const classNameGenerator = () => {
    const className = ['react-stack-prgoress-area']
    if (isLoading) className.push('enter')
    if (active) className.push('active')
    if (done) className.push('done')
    return className.join(' ')
  }

  return (
    <div className={classNameGenerator()}>
      {loadingComp ? (
        cloneElement(loadingComp)
      ) : (
        <Lottie animationData={loadingLottie} loop={true} />
      )}
    </div>
  )
}
