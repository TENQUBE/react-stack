import { useRef, useEffect, useCallback, useState } from 'react'
import { ANIMATION_DURATION } from '../constants'

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number // touchstart에서 BottomSheet의 최상단 모서리의 Y값
    touchY: number // touchstart에서 터치 포인트의 Y값
  }
  touchMove: {
    prevTouchY?: number // 다음 touchmove 이벤트 핸들러에서 필요한 터치 포인트 Y값을 저장
    movingDirection: 'none' | 'down' | 'up' // 유저가 터치를 움직이고 있는 방향
  }
  isContentTouched: boolean // 컨텐츠 영역을 터치하고 있음을 기록
}

interface IProps {
  minHeightFromTop: number // (바텀시트 오픈했을때 최대 높이)
  maxHeightFromTop: number // (바텀시트 닫혔을때 최소 높이)
}

export function useBottomSheet({ minHeightFromTop, maxHeightFromTop }: IProps) {
  const [isExit, setExit] = useState(false)

  const eventRef = useRef<HTMLDivElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: 'none'
    },
    isContentTouched: false
  })

  const canMoveBottomSheet = () => {
    const { touchMove, isContentTouched } = metrics.current

    if (!isContentTouched) return true
    if (sheetRef.current.getBoundingClientRect().y !== minHeightFromTop) return true
    if (touchMove.movingDirection === 'down') return contentRef.current.scrollTop <= 0

    return false
  }

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const { touchStart } = metrics.current

    touchStart.sheetY = sheetRef.current.getBoundingClientRect().y
    touchStart.touchY = e.touches[0].clientY

    sheetRef.current.style.setProperty('transition', `none`)
  }, [])

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current
      const currentTouch = e.touches[0]

      if (touchMove.prevTouchY === undefined || touchMove.prevTouchY === 0) {
        touchMove.prevTouchY = touchStart.touchY
      }

      if (touchMove.prevTouchY <= currentTouch.clientY) {
        touchMove.movingDirection = 'down'
      } else {
        touchMove.movingDirection = 'up'
      }

      if (canMoveBottomSheet()) {
        if (e.cancelable) e.preventDefault()

        const touchOffset = currentTouch.clientY - touchStart.touchY
        let nextSheetY = touchStart.sheetY + touchOffset

        if (nextSheetY <= minHeightFromTop) {
          nextSheetY = minHeightFromTop
        }

        sheetRef.current.style.setProperty(
          'transform',
          `translateY(${nextSheetY - maxHeightFromTop}px)`
        )
      }
    },
    [minHeightFromTop]
  )

  const handleTouchEnd = useCallback(() => {
    const { touchMove } = metrics.current
    const currentSheetY = sheetRef.current.getBoundingClientRect().y

    sheetRef.current.style.setProperty('transition', `transform ${ANIMATION_DURATION / 1000}s`)

    if (touchMove.movingDirection === 'down') {
      if (currentSheetY > maxHeightFromTop + 30) {
        sheetRef.current.style.setProperty(
          'transform',
          `translateY(calc(100vh - ${maxHeightFromTop}px))`
        )
        setExit(true)
      } else {
        sheetRef.current.style.setProperty('transform', 'translateY(0)')
      }
    } else {
      if (currentSheetY !== minHeightFromTop) {
        sheetRef.current.style.setProperty(
          'transform',
          `translateY(${minHeightFromTop - maxHeightFromTop}px)`
        )
      }
    }

    metrics.current = {
      touchStart: {
        sheetY: 0,
        touchY: 0
      },
      touchMove: {
        prevTouchY: 0,
        movingDirection: 'none'
      },
      isContentTouched: false
    }
  }, [minHeightFromTop])

  useEffect(() => {
    eventRef.current?.addEventListener('touchstart', handleTouchStart)
    eventRef.current?.addEventListener('touchmove', handleTouchMove)
    eventRef.current?.addEventListener('touchend', handleTouchEnd)

    return () => {
      eventRef.current?.removeEventListener('touchstart', handleTouchStart)
      eventRef.current?.removeEventListener('touchmove', handleTouchMove)
      eventRef.current?.removeEventListener('touchend', handleTouchEnd)
    }
  }, [minHeightFromTop])

  useEffect(() => {
    const handleTouchStart = () => {
      metrics.current.isContentTouched = true
    }

    eventRef.current?.addEventListener('touchstart', handleTouchStart)
    return () => {
      eventRef.current?.removeEventListener('touchstart', handleTouchStart)
    }
  }, [])

  return { eventRef, sheetRef, contentRef, isExit }
}
