import { cloneElement, useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { IScreen } from '../data/screen'
import { AnimationClassName } from '../interfaces'
import { ANIMATION_DURATION } from '../constants'
import { isHashRoute } from '../utils'
import { ReactStackContext } from './provider'

interface IProps {
  duration?: number
}

const Stacks = ({ duration }: IProps) => {
  const animationDuration = typeof duration === 'number' ? duration : ANIMATION_DURATION

  const { stacks } = useContext(ReactStackContext)

  // 현재 출력된 전체 스크린 배열
  const allPrintScreenArr = stacks.filter(({ route }) => !isHashRoute(route))
  // 현재 출력된 마지막 스크린의 인덱스
  const activeScreenIdx = allPrintScreenArr.length - 1
  // 다음 스크린의 애니메이션 값 호출
  const getAfterAnimation = (idx: number) => {
    if(idx >= activeScreenIdx || !allPrintScreenArr[idx + 1]) return 'none'
    return AnimationClassName[allPrintScreenArr[idx + 1].animation]
  }
  
  return (
    <TransitionGroup>
      {stacks.map(({ route, component, animation, pathVariable }, i: number, arr: IScreen[]) => {
        // 해시로 추가된 히스토리는 스크린을 출력하지 않음
        if(isHashRoute(route)) return null
        // 출력된 각각의 스크린 인덱스
        const idx = i - arr.slice(0, i).filter(({ route }) => isHashRoute(route)).length

        return (
          <CSSTransition 
            key={i} 
            timeout={animationDuration} 
            classNames={`react-stack-box react-stack-box-${AnimationClassName[animation]} react-stack-box`}
            style={{
              transition: `transform ${animationDuration/1000}s, opacity ${animationDuration/1000}s`,
              display: activeScreenIdx > idx + 1 ? 'none' : 'block'
            }}
          >
            <div data-after-animation={getAfterAnimation(idx)}>
              <div 
                className={'react-stack-dimmed-area'}
                style={{
                  'transition': `opacity ${animationDuration/1000}s`
                }}
              /> 
              { cloneElement(component, {...{ params: pathVariable }}) }
            </div>
          </CSSTransition>
        )
      })}
    </TransitionGroup>
  )
}

export default Stacks