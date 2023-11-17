/**
 * @jest-environment jsdom
 */

import React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import ReactStackProvider, { AnimationType, Link, Screen } from '../../dist/esm'

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

test('링크 컴포넌트를 사용하여 새로운 스크린을 출력할 수 있다.', async () => {
  const result = render(
    <ReactStackProvider duration={300} delay={100} progressIndicator={true} loadingComponent={null}>
      <Screen route="/" component={<Dashboard />} animation={AnimationType.None} className={''}/>
      <Screen route="/about" component={<AboutUs />} animation={AnimationType.None} className={''}/>
    </ReactStackProvider>
  )
  expect(screen.getByText('dashboard')).toBeInTheDocument()
  const user = userEvent.setup()

  await user.click(result.getByText('about'))
  expect(screen.getByText('about us')).toBeInTheDocument()
})