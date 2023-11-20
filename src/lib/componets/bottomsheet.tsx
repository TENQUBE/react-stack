import { ReactElement, cloneElement, useContext, useEffect } from 'react'

import { useBottomSheet } from '../hooks/useBottomSheet'
import { usePDC } from '../hooks/usePDC'
import { useNavigation } from '..'
import { ReactStackContext } from './provider'
import ScreenObj from '../data/screen'
import { AnimationType } from '../interfaces'

interface IContainerProps {
  height?: number
  isExpandabled?: boolean
  children: React.ReactNode
}

const BottomSheetContainer = ({ isExpandabled, height = window.innerHeight * 0.4, children }: IContainerProps) => {
  const navigation = useNavigation()
  const pdc = usePDC()

  const maxHeightFromTop = window.innerHeight - height
  const minHeightFromTop = isExpandabled ? 0 : maxHeightFromTop

  const { eventRef, sheetRef, contentRef, isExit } = useBottomSheet({ minHeightFromTop, maxHeightFromTop })

  const handleClickExit = () => {
    pdc(navigation.back)
  }

  useEffect(() => {
    if(isExit) handleClickExit()
  }, [isExit])

  return (
    <>
      <div 
        className='react-stack-bottom-sheet-dimmed-area' 
        onClick={handleClickExit} 
      />
      <div 
        ref={sheetRef}  
        className={'react-stack-bottom-sheet-content-area'}
        onClick={(e) => e.stopPropagation()}
        style={{
          '--maxHeight-fromTop': `${maxHeightFromTop}px`,
          '--bottomsheet-height': `${height}px`,
          'top': `${maxHeightFromTop}px`
        } as any}
      >
        <div 
          ref={eventRef} 
          className='react-stack-bottom-sheet-drag-area'
          onClick={(e) => e.stopPropagation()} 
        />
        <div 
          ref={contentRef} 
          className='react-stack-bottom-sheet-content-box'
        >
          { children }
        </div>
      </div>
    </>
  )
}

interface IBottomSheetComp {
  component: ReactElement
  isExpandabled?: boolean
  height?: number
  params?: unknown
}

const BottomSheetComp = ({ component, isExpandabled, height, params }: IBottomSheetComp) => {
  return (
    <BottomSheetContainer isExpandabled={isExpandabled} height={height}>
      { cloneElement(component, {...{ params }}) }
    </BottomSheetContainer>
  )
}

interface IProps {
  route: string
  component: ReactElement
  isExpandabled?: boolean
  height?: number
  className?: string
}

const BottomSheet = ({ route,  component, isExpandabled, height, className }: IProps)  => {
  const { addScreen } = useContext(ReactStackContext)

  addScreen(new ScreenObj({ 
    route, 
    component: <BottomSheetComp isExpandabled={isExpandabled} height={height} component={component} />, 
    animation: AnimationType.BotttomSheet,
    className
  }))

  return null
}

export default BottomSheet