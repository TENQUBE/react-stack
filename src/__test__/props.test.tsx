/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import ReactStackProvider, { AnimationType, BottomSheet, Screen, Toast } from '../../dist/esm'

beforeEach(() => {
  window = Object.create(window)

  Object.defineProperty(window, 'location', {
    value: {
      href: 'http://localhost:1234/about/boo',
      origin: 'http://localhost:1234',
      pathname: '/about/boo'
    },
    writable: true
  })

  window.sessionStorage.clear()
})

test('스크린 컴포넌트에서 Path Variable 값을 Params Props로 사용할 수 있다.', async () => {
  const AboutUs = ({ params }: { params?: { foo: string } }) => {
    return (
      <div>
        <h1>about us</h1>
        <p>foo={params?.foo}</p>
      </div>
    )
  }

  render(
    <ReactStackProvider duration={0} delay={0} progressIndicator={false} loadingComponent={null}>
      <Screen
        route="/about/:foo"
        component={<AboutUs />}
        animation={AnimationType.None}
        className={''}
      />
    </ReactStackProvider>
  )

  expect(screen.getByText('about us')).toBeInTheDocument()
  expect(screen.getByText('foo=boo')).toBeInTheDocument()
})

test('바텀시트에서 Path Variable 값을 Params Props로 사용할 수 있다.', async () => {
  const AboutUs = ({ params }: { params?: { foo: string } }) => {
    return (
      <div>
        <h1>about us</h1>
        <p>foo={params?.foo}</p>
      </div>
    )
  }

  render(
    <ReactStackProvider duration={0} delay={0} progressIndicator={false} loadingComponent={null}>
      <BottomSheet
        route="/about/:foo"
        component={<AboutUs />}
        className={''}
        isExpandabled={false}
        height={200}
      />
    </ReactStackProvider>
  )

  expect(screen.getByText('about us')).toBeInTheDocument()
  expect(screen.getByText('foo=boo')).toBeInTheDocument()
})

test('토스트에서 Path Variable 값을 Params Props로 사용할 수 있다.', async () => {
  const AboutUs = ({ params }: { params?: { foo: string } }) => {
    return (
      <div>
        <h1>about us</h1>
        <p>foo={params?.foo}</p>
      </div>
    )
  }

  render(
    <ReactStackProvider duration={0} delay={0} progressIndicator={false} loadingComponent={null}>
      <Toast route="/about/:foo" component={<AboutUs />} className={''} />
    </ReactStackProvider>
  )

  expect(screen.getByText('about us')).toBeInTheDocument()
  expect(screen.getByText('foo=boo')).toBeInTheDocument()
})
