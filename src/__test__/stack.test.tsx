/**
 * @jest-environment jsdom
 */

import React from 'react'
import { act, renderHook, waitFor } from '@testing-library/react'
import ReactStackProvider, {
  AnimationType,
  Link,
  Screen,
  useNavigation,
  useStacks
} from '../../dist/esm'
import { initWindowLocation } from './shares/location'

beforeEach(() => {
  initWindowLocation()
  window.sessionStorage.clear()
})

test('스택 훅을 사용하면 현재 스택의 상태를 확인할 수 있다.', async () => {
  const Dashboard = ({ children }) => {
    return (
      <div>
        <h1>dashboard</h1>
        <Link to="/about">about</Link>
        {children}
      </div>
    )
  }
  const AboutUs = () => {
    return (
      <div>
        <h1>about us</h1>
        <Link to="/bottomsheet">bottomsheet</Link>
      </div>
    )
  }

  const wrapper = ({ children }) => (
    <ReactStackProvider duration={0} delay={0} progressIndicator={false} loadingComponent={null}>
      <Screen
        route="/"
        component={<Dashboard>{children}</Dashboard>}
        animation={AnimationType.None}
        className={'dashboard'}
      />
      <Screen
        route="/about"
        component={<AboutUs />}
        animation={AnimationType.None}
        className={'about'}
      />
    </ReactStackProvider>
  )

  const { result } = renderHook(
    () => {
      return {
        stacks: useStacks(),
        navigation: useNavigation()
      }
    },
    { wrapper }
  )

  // 처음 진입시 기본 라우트 '/'의 화면 1개가 스택에 있습니다.
  expect(result.current.stacks.length).toBe(1)

  await act(async () => {
    result.current.navigation.push('/about')
  })

  // about 화면이 추가되어 스택에 2개의 화면이 있습니다.
  await waitFor(() => expect(result.current.stacks.length).toBe(2))

  await act(async () => {
    await result.current.navigation.back()
  })

  // 뒤로가기를 실행하여 다시 스택은 하나가 됩니다.
  await waitFor(() => expect(result.current.stacks.length).toBe(1))
})
