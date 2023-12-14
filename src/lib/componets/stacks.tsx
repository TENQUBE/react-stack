import { cloneElement, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { IScreen } from '../data/screen'
import { AnimationClassName } from '../interfaces'
import { isHashRoute } from '../utils'
import { ReactStackContext } from './provider'

const Stacks = () => {
  const { stacks, animationDuration, animationDelay, isAddStack } = useContext(ReactStackContext)

  const [isAnimation, setAnimation] = useState(null)

  // 현재 출력된 전체 스크린 배열
  const allPrintScreenArr = stacks.filter(({ route }) => !isHashRoute(route))
  // 현재 출력된 마지막 스크린의 인덱스
  const activeScreenIdx = allPrintScreenArr.length - 1
  // 다음 스크린의 애니메이션 값 호출
  const getAfterAnimation = (idx: number) => {
    if (idx >= activeScreenIdx || !allPrintScreenArr[idx + 1]) return 'none'
    return AnimationClassName[allPrintScreenArr[idx + 1].animation]
  }

  useLayoutEffect(() => {
    if (stacks.length === 0) return

    // 스택이 없고 초기 라우팅에서 애니메이션을 사용하고 싶지 않을때
    if (isAnimation === null && stacks.length === 1 && !stacks[0].useInitialAnimation) {
      setAnimation(false)
      return
    }

    // 새로고침으로 접근했을때, (이미 스택을 가지고 있는 경우 애니메이션을 비활성화)
    setAnimation(!(isAnimation === null && stacks.length > 1))
  }, [stacks])

  useEffect(() => {
    if (isAnimation) return
    // 랜더링이 된 후 애니메이션이 비활성화 되어 있다면 다시 활성화
    setTimeout(() => {
      setAnimation(true)
    }, animationDuration)
  }, [isAnimation])

  const duration = isAnimation ? animationDuration / 1000 : 0
  const delay = isAnimation ? animationDelay / 1000 : 0

  return (
    <TransitionGroup
      style={
        {
          '--animation-duration': `${duration}s`,
          '--animation-delay': `${isAddStack.current ? delay : 0}s`
        } as any
      }
    >
      {stacks.map(
        ({ route, component, animation, pathVariable, className }, i: number, arr: IScreen[]) => {
          // 해시로 추가된 히스토리는 스크린을 출력하지 않음
          if (isHashRoute(route)) return null
          // 출력된 각각의 스크린 인덱스
          const idx = i - arr.slice(0, i).filter(({ route }) => isHashRoute(route)).length
          // className 프롭스가 있다면 추가
          const stackClassName = className ? `${className} react-stack-box` : 'react-stack-box'

          return (
            <CSSTransition
              key={route + i}
              timeout={{
                enter: animationDuration + animationDelay,
                exit: animationDuration
              }}
              classNames={`${stackClassName} react-stack-box-${AnimationClassName[animation]} react-stack-box`}
            >
              <div data-after-animation={getAfterAnimation(idx)}>
                {cloneElement(component, {
                  ...{
                    params: pathVariable,
                    animationDuration: animationDuration
                  }
                })}
              </div>
            </CSSTransition>
          )
        }
      )}
    </TransitionGroup>
  )
}

export default Stacks
