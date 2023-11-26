/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ReactStackProvider, { AnimationType, Screen, useLoading } from '../../dist/esm'
import { initWindowLocation } from './shares/location'

beforeEach(() => {
  initWindowLocation()
  window.sessionStorage.clear()
})

test('로딩 훅을 사용해서 프로그래스 인디케이터를 실행할 수 있다.', async () => {
  const Dashboard = () => {
    const setLoading = useLoading()

    const handleClick = () => {
      setLoading()
    }

    return (
      <div>
        <h1>dashboard</h1>
        <p onClick={handleClick}>loading</p>
      </div>
    )
  }

  const duration = 200

  render(
    <ReactStackProvider duration={duration} delay={0} progressIndicator={true} loadingComponent={null}>
      <Screen route="/" component={<Dashboard />} animation={AnimationType.None} className={'dashboard'} />
    </ReactStackProvider>
  )

  const user = userEvent.setup()

  expect(screen.getByText('dashboard')).toBeInTheDocument()

  await user.click(screen.getByText('loading'))
  expect(document.getElementsByClassName('react-stack-prgoress-area enter').length).toBe(1)
  
  // 로딩은 일정시간이(duration[200] + margin[100] + fadeOut[150]) 경과한 후에는 사라집니다.
  await waitFor(() => expect(document.getElementsByClassName('react-stack-prgoress-area enter').length).toBe(0))
})

test('프로그래스 인디케이터 화면을 컴포넌트로 지정할 수 있다.', async () => {
  const Dashboard = () => {
    const setLoading = useLoading()

    const handleClick = () => {
      setLoading()
    }

    return (
      <div>
        <h1>dashboard</h1>
        <p onClick={handleClick}>loading</p>
      </div>
    )
  }

  const Indicator = () => {
    return (
      <p>progress indicator</p>
    )
  }

  render(
    <ReactStackProvider duration={200} delay={0} progressIndicator={true} loadingComponent={<Indicator />}>
      <Screen route="/" component={<Dashboard />} animation={AnimationType.None} className={'dashboard'} />
    </ReactStackProvider>
  )

  const user = userEvent.setup()

  expect(screen.getByText('dashboard')).toBeInTheDocument()

  await user.click(screen.getByText('loading'))
  expect(screen.getByText('progress indicator')).toBeInTheDocument()
  
  // 역시 로딩은 일정시간 후에는 사라집니다.
  await waitFor(() => expect(document.getElementsByClassName('react-stack-prgoress-area enter').length).toBe(0))
})