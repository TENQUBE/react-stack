import { ReactElement, cloneElement, useContext, useLayoutEffect } from 'react'
import { ReactStackContext } from './provider'
import ScreenObj from '../data/screen'
import { AnimationType } from '../interfaces'
import { useNavigation } from '..'
import { usePDC } from '../hooks/usePDC'

const ToastContainer = ({ animationDuration, children }) => {
  const navigation = useNavigation()
  const pdc = usePDC()

  const handleClickExit = () => {
    pdc(navigation.back)
  }
  
  return (
    <>
      <div 
        className={'react-stack-toast-dimmed-area'}
        style={{
          'transitionProperty': 'opacity',
          'transitionDuration': `${animationDuration/1000}s`,
          'transitionTimingFunction': 'ease'
        }}
      />
      <div 
        className={'react-stack-toast-content-area'}
        onClick={handleClickExit} 
        style={{
          'transitionProperty': 'transform, opacity',
          'transitionDuration': `${animationDuration/1000}s, ${animationDuration/2000}s`,
          'transitionTimingFunction': 'ease, ease'
        }}
      >
        <div 
          className={'react-stack-toast-content-box'}
          onClick={(e) => e.stopPropagation()} 
        >
          { children }
        </div>
      </div>
    </>
  )
}

interface IToastComp {
  component: ReactElement
  animationDuration?: number
  params?: unknown
}

const ToastComponent = ({ component, params, animationDuration }: IToastComp) => {
  return (
    <ToastContainer animationDuration={animationDuration}>
      { cloneElement(component, {...{ params }}) }
    </ToastContainer>
  )
}

interface IProps {
  route: string
  component: ReactElement
  animation?: AnimationType
}

const Toast = ({ route, component }: IProps) => {
  const { addScreen } = useContext(ReactStackContext)

  useLayoutEffect(() => {
    addScreen(new ScreenObj({ 
      route, 
      component: <ToastComponent component={component} />, 
      animation: AnimationType.Toast
    }))
  }, [])

  return null
}

export default Toast