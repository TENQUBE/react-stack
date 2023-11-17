/**
 * @jest-environment jsdom
 */

import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import ReactStackProvider, { AnimationType, Link, Screen } from '../../dist/esm'

const initWindowLocation = () => {
  window = Object.create(window)

  Object.defineProperty(window, 'location', {
    value: {
      href: 'http://localhost:1234/',
      origin: 'http://localhost:1234',
      pathname: '/'
    },
    writable: true
  })
}

beforeEach(() => {
  initWindowLocation()
  window.sessionStorage.clear()
})

test('링크 컴포넌트를 사용하여 새로운 화면(스택)을 추가할 수 있다.', async () => {
  const Dashboard = () => {
    return (
      <div>
        <h1>dashboard</h1>
        <Link to="/about">about</Link>
      </div>
    )
  }
  const AboutUs = () => {
    return (
      <div>
        <h1>about us</h1>
      </div>
    )
  }

  const result = render(
    <ReactStackProvider duration={0} delay={0} progressIndicator={false} loadingComponent={null}>
      <Screen route="/" component={<Dashboard />} animation={AnimationType.None} className={''} />
      <Screen route="/about" component={<AboutUs />} animation={AnimationType.None} className={''} />
    </ReactStackProvider>
  )

  const user = userEvent.setup()

  expect(screen.getByText('dashboard')).toBeInTheDocument()

  await user.click(result.getByText('about'))
  expect(screen.getByText('about us')).toBeInTheDocument()
})


test('링크 컴포넌트를 사용하여 해시를 추가할 수 있다.', async () => {
  const Dashboard = () => {
    return (
      <div>
        <h1>dashboard</h1>
        <Link to="#hash">new hash</Link>
      </div>
    )
  }

  const result = render(
    <ReactStackProvider duration={0} delay={0} progressIndicator={false} loadingComponent={null}>
      <Screen route="/" component={<Dashboard />} animation={AnimationType.None} className={''} />
    </ReactStackProvider>
  )

  const user = userEvent.setup()

  expect(screen.getByText('dashboard')).toBeInTheDocument()

  await user.click(result.getByText('new hash'))
  expect(window.location.hash).toEqual('#hash')
})