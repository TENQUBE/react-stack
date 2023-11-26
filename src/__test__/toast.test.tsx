/**
 * @jest-environment jsdom
 */

import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ReactStackProvider, { AnimationType, Link, Screen, Toast } from '../../dist/esm'
import { initWindowLocation } from './shares/location'

beforeEach(() => {
  initWindowLocation()
  window.sessionStorage.clear()
})

test('토스트박스 형태의 화면을 출력할 수 있다.', async () => {
  const Dashboard = () => {
    return (
      <div>
        <h1>dashboard</h1>
        <Link to="/toast">toast</Link>
      </div>
    )
  }
  const ToastContent = () => {
    return (
      <div>
        <h1>toast content</h1>
      </div>
    )
  }

  render(
    <ReactStackProvider duration={0} delay={0} progressIndicator={false} loadingComponent={null}>
      <Screen route="/" component={<Dashboard />} animation={AnimationType.None} className={'dashboard'} />
      <Toast route="/toast" component={<ToastContent />} className={'toast'} />
    </ReactStackProvider>
  )

  const user = userEvent.setup()

  expect(screen.getByText('dashboard')).toBeInTheDocument()

  await user.click(screen.getByText('toast'))
  expect(screen.getByText('toast content')).toBeInTheDocument()
})

test('토스트 화면의 dimmed 영역을 터치하면 바텀시트 화면을 종료한다.', async () => {
  const Dashboard = () => {
    return (
      <div>
        <h1>dashboard</h1>
        <Link to="/toast">toast</Link>
      </div>
    )
  }
  const ToastContent = () => {
    return (
      <div>
        <h1>toast content</h1>
      </div>
    )
  }

  render(
    <ReactStackProvider duration={0} delay={0} progressIndicator={false} loadingComponent={null}>
      <Screen route="/" component={<Dashboard />} animation={AnimationType.None} className={'dashboard'} />
      <Toast route="/toast" component={<ToastContent />} className={'toast'} />
    </ReactStackProvider>
  )

  const user = userEvent.setup()

  expect(screen.getByText('dashboard')).toBeInTheDocument()

  await user.click(screen.getByText('toast'))
  expect(screen.getByText('toast content')).toBeInTheDocument()
  expect(document.getElementsByClassName('toast').length).toBe(1)

  fireEvent.click(document.getElementsByClassName('react-stack-toast-content-area')[0])
  await waitFor(() => expect(document.getElementsByClassName('toast').length).toBe(0))
})