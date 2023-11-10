import { ReactElement, cloneElement, useContext, useLayoutEffect } from 'react'
import { ReactStackContext } from './provider'
import ScreenObj from '../data/screen'
import { AnimationType } from '../interfaces'

const ScreenContainer = ({ animationDuration, children }) => {
  return (
    <>
      <div 
        className={'react-stack-dimmed-area'}
        style={{
          'transitionProperty': 'opacity',
          'transitionDuration': `${animationDuration/1000}s`,
          'transitionTimingFunction': 'ease'
        }}
      />
      <div className={'react-stack-content-area'}>
        { children }
      </div>
    </>
  )
}

interface IScreenComp {
  component: ReactElement
  animationDuration?: number
  params?: unknown
}

const ScreenComponent = ({ component, params, animationDuration }: IScreenComp) => {
  return (
    <ScreenContainer animationDuration={animationDuration}>
      { cloneElement(component, {...{ params }}) }
    </ScreenContainer>
  )
}

interface IProps {
  route: string
  component: ReactElement
  animation?: AnimationType
}

const Screen = ({ route, component, animation }: IProps) => {
  const { addScreen } = useContext(ReactStackContext)

  useLayoutEffect(() => {
    addScreen(new ScreenObj({ 
      route, 
      component: <ScreenComponent component={component} />, 
      animation
    }))
  }, [])

  return null
}

export default Screen