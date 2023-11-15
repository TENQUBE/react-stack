import { cloneElement, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { IScreen } from '../data/screen'
import { AnimationClassName } from '../interfaces'
import { isHashRoute } from '../utils'
import { ReactStackContext } from './provider'

const Stacks = () => {
  const { stacks, animationDuration, animationDelay } = useContext(ReactStackContext)
  const beforeStackLength = useRef(stacks.length)

  const [isAnimation, setAnimation] = useState(null)

  // 현재 출력된 전체 스크린 배열
  const allPrintScreenArr = stacks.filter(({ route }) => !isHashRoute(route))
  // 현재 출력된 마지막 스크린의 인덱스
  const activeScreenIdx = allPrintScreenArr.length - 1
  // 다음 스크린의 애니메이션 값 호출
  const getAfterAnimation = (idx: number) => {
    if(idx >= activeScreenIdx || !allPrintScreenArr[idx + 1]) return 'none'
    return AnimationClassName[allPrintScreenArr[idx + 1].animation]
  }

  useLayoutEffect(() => {
    if(stacks.length === 0) return
    // 새로고침으로 접근했을때, (이미 스택을 가지고 있는 경우 애니메이션을 비활성화)
    setAnimation(!(isAnimation === null && stacks.length > 1))
  }, [stacks])

  useEffect(() => {
    if(isAnimation) return
    // 랜더링이 된 후 애니메이션이 비활성화 되어 있다면 다시 활성화
    setAnimation(true)
  }, [isAnimation])

  // 스택이 추가되었는지 확인
  const isAddStack = stacks.length > beforeStackLength.current
  beforeStackLength.current = stacks.length

  const duration = isAnimation ? animationDuration / 1000 : 0
  const delay = isAnimation ? animationDelay / 1000 : 0

  return (
    <TransitionGroup style={{
      '--animation-duration': `${duration}s`,
      '--animation-delay': `${delay}s`
    } as any}>
      {stacks.map(({ route, component, animation, pathVariable, className }, i: number, arr: IScreen[]) => {
        // 해시로 추가된 히스토리는 스크린을 출력하지 않음
        if(isHashRoute(route)) return null
        // 출력된 각각의 스크린 인덱스
        const idx = i - arr.slice(0, i).filter(({ route }) => isHashRoute(route)).length
        // 스택이 추가되는 경우 애니메이션 딜레이 시간 추가
        const timeout = isAddStack ? animationDuration + animationDelay : animationDuration

        return (
          <CSSTransition 
            key={route + i} 
            timeout={isAnimation ? timeout : 0} 
            classNames={`${className} react-stack-box react-stack-box-${AnimationClassName[animation]} react-stack-box`}
          >
            <div data-after-animation={getAfterAnimation(idx)}>
              {
                cloneElement(component, {...{ 
                  params: pathVariable, 
                  animationDuration: animationDuration 
                }})
              }
            </div>
          </CSSTransition>
        )
      })}
    </TransitionGroup>
  )
}

export default Stacks