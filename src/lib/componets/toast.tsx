import { ReactElement, cloneElement, useContext } from 'react'
import { ReactStackContext } from './provider'
import { AnimationType } from '../interfaces'
import { useNavigation } from '..'
import { usePDC } from '../hooks/usePDC'

const ToastContainer = ({ children }) => {
  const navigation = useNavigation()
  const pdc = usePDC()

  const handleClickExit = () => {
    pdc(navigation.back)
  }
  
  return (
    <>
      <div 
        className={'react-stack-toast-dimmed-area'}
      />
      <div 
        className={'react-stack-toast-content-area'}
        onClick={handleClickExit}
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
  params?: unknown
}

const ToastComponent = ({ component, params }: IToastComp) => {
  return (
    <ToastContainer>
      { cloneElement(component, {...{ params }}) }
    </ToastContainer>
  )
}

interface IProps {
  route: string
  component: ReactElement
  className?: string
}

const Toast = ({ route, component, className }: IProps) => {
  const { addScreen } = useContext(ReactStackContext)

  addScreen({ 
    route, 
    component: <ToastComponent component={component} />, 
    animation: AnimationType.Toast,
    className
  })

  return null
}

export default Toast