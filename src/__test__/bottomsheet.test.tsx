/**
 * @jest-environment jsdom
 */

import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ReactStackProvider, { AnimationType, BottomSheet, Link, Screen } from '../../dist/esm'
import { initWindowLocation } from './shares/location'

beforeEach(() => {
  initWindowLocation()
  window.sessionStorage.clear()
})

test('바텀시트 형태의 화면을 출력할 수 있다.', async () => {
  const Dashboard = () => {
    return (
      <div>
        <h1>dashboard</h1>
        <Link to="/bottomsheet">bottom sheet</Link>
      </div>
    )
  }
  const BottomSheetContent = () => {
    return (
      <div>
        <h1>bottom sheet content</h1>
      </div>
    )
  }

  render(
    <ReactStackProvider duration={0} delay={0} progressIndicator={false} loadingComponent={null}>
      <Screen
        route="/"
        component={<Dashboard />}
        animation={AnimationType.None}
        className={'dashboard'}
      />
      <BottomSheet
        route="/bottomsheet"
        component={<BottomSheetContent />}
        isExpandabled={false}
        height={200}
        className={'bottomsheet'}
      />
    </ReactStackProvider>
  )

  const user = userEvent.setup()

  expect(screen.getByText('dashboard')).toBeInTheDocument()

  await user.click(screen.getByText('bottom sheet'))
  expect(screen.getByText('bottom sheet content')).toBeInTheDocument()
})

test('바텀시트 화면의 dimmed 영역을 터치하면 바텀시트 화면을 종료한다.', async () => {
  const Dashboard = () => {
    return (
      <div>
        <h1>dashboard</h1>
        <Link to="/bottomsheet">bottom sheet</Link>
      </div>
    )
  }
  const BottomSheetContent = () => {
    return (
      <div>
        <h1>bottom sheet content</h1>
      </div>
    )
  }

  render(
    <ReactStackProvider duration={0} delay={0} progressIndicator={false} loadingComponent={null}>
      <Screen
        route="/"
        component={<Dashboard />}
        animation={AnimationType.None}
        className={'dashboard'}
      />
      <BottomSheet
        route="/bottomsheet"
        component={<BottomSheetContent />}
        isExpandabled={false}
        height={200}
        className={'bottomsheet'}
      />
    </ReactStackProvider>
  )

  const user = userEvent.setup()

  expect(screen.getByText('dashboard')).toBeInTheDocument()

  await user.click(screen.getByText('bottom sheet'))
  expect(screen.getByText('bottom sheet content')).toBeInTheDocument()
  expect(document.getElementsByClassName('bottomsheet').length).toBe(1)

  fireEvent.click(document.getElementsByClassName('react-stack-bottom-sheet-dimmed-area')[0])
  await waitFor(() => expect(document.getElementsByClassName('bottomsheet').length).toBe(0))
})

test('바텀시트의 확장 기능을 활성화하면 드래그하여 확장할 수 있다.', async () => {
  const Dashboard = () => {
    return (
      <div>
        <h1>dashboard</h1>
        <Link to="/bottomsheet">bottom sheet</Link>
      </div>
    )
  }
  const BottomSheetContent = () => {
    return (
      <div>
        <h1>bottom sheet content</h1>
      </div>
    )
  }

  const deviceHeight = 740
  const bottomSheetHeight = 400

  window = Object.create(window)
  Object.defineProperty(window, 'innerHeight', {
    value: deviceHeight,
    writable: true
  })

  render(
    <ReactStackProvider duration={0} delay={0} progressIndicator={false} loadingComponent={null}>
      <Screen
        route="/"
        component={<Dashboard />}
        animation={AnimationType.None}
        className={'dashboard'}
      />
      <BottomSheet
        route="/bottomsheet"
        component={<BottomSheetContent />}
        isExpandabled={true}
        height={bottomSheetHeight}
        className={'bottomsheet'}
      />
    </ReactStackProvider>
  )

  const user = userEvent.setup()

  expect(screen.getByText('dashboard')).toBeInTheDocument()

  await user.click(screen.getByText('bottom sheet'))
  expect(screen.getByText('bottom sheet content')).toBeInTheDocument()

  const bottomsheetArea = (
    document.getElementsByClassName(
      'react-stack-bottom-sheet-content-area'
    ) as HTMLCollectionOf<HTMLElement>
  )[0]
  bottomsheetArea.getBoundingClientRect = jest.fn(
    () =>
      ({
        y: deviceHeight - bottomSheetHeight
      } as any)
  )

  const dragArea = document.getElementsByClassName('react-stack-bottom-sheet-drag-area')[0]

  // 드래그 영역을 드래그해서 위로 올렸다면,
  fireEvent.touchStart(dragArea, { touches: [{ clientY: 100 }] })
  fireEvent.touchMove(dragArea, { touches: [{ clientY: 50 }] })
  fireEvent.touchEnd(dragArea)

  // 바텀시트 뷰가 디바이스 화면의 최상단에 위치합니다.
  expect(bottomsheetArea.style.transform).toBe(`translateY(${bottomSheetHeight - deviceHeight}px)`)
})

test('바텀시트의 확장 기능을 활성화하지 않았다면 드래그하여 확장할 수 없다.', async () => {
  const Dashboard = () => {
    return (
      <div>
        <h1>dashboard</h1>
        <Link to="/bottomsheet">bottom sheet</Link>
      </div>
    )
  }
  const BottomSheetContent = () => {
    return (
      <div>
        <h1>bottom sheet content</h1>
      </div>
    )
  }

  const deviceHeight = 740
  const bottomSheetHeight = 400

  window = Object.create(window)
  Object.defineProperty(window, 'innerHeight', {
    value: deviceHeight,
    writable: true
  })

  render(
    <ReactStackProvider duration={0} delay={0} progressIndicator={false} loadingComponent={null}>
      <Screen
        route="/"
        component={<Dashboard />}
        animation={AnimationType.None}
        className={'dashboard'}
      />
      <BottomSheet
        route="/bottomsheet"
        component={<BottomSheetContent />}
        isExpandabled={false}
        height={bottomSheetHeight}
        className={'bottomsheet'}
      />
    </ReactStackProvider>
  )

  const user = userEvent.setup()

  expect(screen.getByText('dashboard')).toBeInTheDocument()

  await user.click(screen.getByText('bottom sheet'))
  expect(screen.getByText('bottom sheet content')).toBeInTheDocument()

  const bottomsheetArea = (
    document.getElementsByClassName(
      'react-stack-bottom-sheet-content-area'
    ) as HTMLCollectionOf<HTMLElement>
  )[0]
  bottomsheetArea.getBoundingClientRect = jest.fn(
    () =>
      ({
        y: deviceHeight - bottomSheetHeight
      } as any)
  )

  const dragArea = document.getElementsByClassName('react-stack-bottom-sheet-drag-area')[0]

  // 드래그 영역을 드래그해서 위로 올렸다면,
  fireEvent.touchStart(dragArea, { touches: [{ clientY: 100 }] })
  fireEvent.touchMove(dragArea, { touches: [{ clientY: 50 }] })
  fireEvent.touchEnd(dragArea)

  // 바텀시트의 위치가 변경돠는 스타일이 생성되지 않습니다.
  expect(bottomsheetArea.style.transform).toBe('')
})

test('바텀시트의 드래그 영역을 드래그해서 아래로 내리면 바텀시트가 화면이 종료된다.', async () => {
  const Dashboard = () => {
    return (
      <div>
        <h1>dashboard</h1>
        <Link to="/bottomsheet">bottom sheet</Link>
      </div>
    )
  }
  const BottomSheetContent = () => {
    return (
      <div>
        <h1>bottom sheet content</h1>
      </div>
    )
  }

  const deviceHeight = 740
  const bottomSheetHeight = 400

  window = Object.create(window)
  Object.defineProperty(window, 'innerHeight', {
    value: deviceHeight,
    writable: true
  })

  render(
    <ReactStackProvider duration={0} delay={0} progressIndicator={false} loadingComponent={null}>
      <Screen
        route="/"
        component={<Dashboard />}
        animation={AnimationType.None}
        className={'dashboard'}
      />
      <BottomSheet
        route="/bottomsheet"
        component={<BottomSheetContent />}
        isExpandabled={false}
        height={bottomSheetHeight}
        className={'bottomsheet'}
      />
    </ReactStackProvider>
  )

  const user = userEvent.setup()

  expect(screen.getByText('dashboard')).toBeInTheDocument()

  await user.click(screen.getByText('bottom sheet'))
  expect(screen.getByText('bottom sheet content')).toBeInTheDocument()

  const bottomsheetArea = (
    document.getElementsByClassName(
      'react-stack-bottom-sheet-content-area'
    ) as HTMLCollectionOf<HTMLElement>
  )[0]
  bottomsheetArea.getBoundingClientRect = jest.fn(
    () =>
      ({
        y: deviceHeight - bottomSheetHeight
      } as any)
  )

  const dragArea = document.getElementsByClassName('react-stack-bottom-sheet-drag-area')[0]

  // 드래그 영역을 드래그해서 아래로 내렸다면, (30px 미만)
  bottomsheetArea.getBoundingClientRect = jest.fn(
    () =>
      ({
        y: deviceHeight - bottomSheetHeight + 20
      } as any)
  )

  fireEvent.touchStart(dragArea, { touches: [{ clientY: 100 }] })
  fireEvent.touchMove(dragArea, { touches: [{ clientY: 150 }] })
  fireEvent.touchEnd(dragArea)

  // 바텀시트 화면이 종료되지 않고 초기 위치로 돌아갑니다.
  expect(bottomsheetArea.style.transform).toBe('translateY(0)')

  // 드래그 영역을 드래그해서 아래로 내렸다면, (30px 이상)
  bottomsheetArea.getBoundingClientRect = jest.fn(
    () =>
      ({
        y: deviceHeight - bottomSheetHeight + 40
      } as any)
  )

  fireEvent.touchStart(dragArea, { touches: [{ clientY: 100 }] })
  fireEvent.touchMove(dragArea, { touches: [{ clientY: 150 }] })
  fireEvent.touchEnd(dragArea)

  // 바텀시트 화면이 종료됩니다.
  await waitFor(() => expect(document.getElementsByClassName('bottomsheet').length).toBe(0))
})
