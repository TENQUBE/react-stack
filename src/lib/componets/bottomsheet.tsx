import { ReactElement, cloneElement, useContext, useEffect, useLayoutEffect } from 'react'

import { useBottomSheet } from '../hooks/useBottomSheet'
import { usePDC } from '../hooks/usePDC'
import { useNavigation } from '..'
import { ReactStackContext } from './provider'
import ScreenObj from '../data/screen'
import { AnimationType } from '../interfaces'

interface IContainerProps {
  height?: number
  isExpandabled?: boolean
  animationDuration?: number
  children: React.ReactNode
}

const BottomSheetContainer = ({ isExpandabled, height = window.innerHeight * 0.4, animationDuration, children }: IContainerProps) => {
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
        style={{
          'transitionProperty': 'opacity',
          'transitionDuration': `${animationDuration/1000}s`,
          'transitionTimingFunction': 'ease'
        }}
      />
      <div 
        ref={sheetRef}  
        className={'react-stack-bottom-sheet-content-area'}
        onClick={(e) => e.stopPropagation()}
        style={{
          'transitionProperty': 'transform',
          'transitionDuration': `${animationDuration/1000}s`,
          'transitionTimingFunction': 'ease',
          top: `${maxHeightFromTop}px`,
          '--maxHeight-fromTop': `${maxHeightFromTop}px`
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
          style={{ 
            height: height - 40 
          }}
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
  animationDuration?: number
}

const BottomSheetComp = ({ component, isExpandabled, height, params, animationDuration }: IBottomSheetComp) => {
  return (
    <BottomSheetContainer isExpandabled={isExpandabled} height={height} animationDuration={animationDuration}>
      { cloneElement(component, {...{ params }}) }
    </BottomSheetContainer>
  )
}

interface IProps {
  route: string
  component: ReactElement
  isExpandabled?: boolean
  height?: number
}

const BottomSheet = ({ route,  component, isExpandabled, height }: IProps)  => {
  const { addScreen } = useContext(ReactStackContext)

  useLayoutEffect(() => {
    addScreen(new ScreenObj({ 
      route, 
      component: <BottomSheetComp isExpandabled={isExpandabled} height={height} component={component} />, 
      animation: AnimationType.BotttomSheet
    }))
  }, [])

  return null
}

export default BottomSheet