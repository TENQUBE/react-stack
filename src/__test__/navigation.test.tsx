/**
 * @jest-environment jsdom
 */

import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import ReactStackProvider, { AnimationType, Screen, useNavigation } from '../../dist/esm'

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

test('네비게이션 훅을 사용하여 새로운 화면(스택)을 추가할 수 있다.', async () => {
  const Dashboard = () => {
    const navigaiton = useNavigation()

    const handleClick = () => {
      navigaiton.push('/about')
    }

    return (
      <div>
        <h1>dashboard</h1>
        <p onClick={handleClick}>about</p>
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

  render(
    <ReactStackProvider duration={0} delay={0} progressIndicator={false} loadingComponent={null}>
      <Screen route="/" component={<Dashboard />} animation={AnimationType.None} className={''} />
      <Screen route="/about" component={<AboutUs />} animation={AnimationType.None} className={''} />
    </ReactStackProvider>
  )

  const user = userEvent.setup()

  expect(screen.getByText('dashboard')).toBeInTheDocument()

  await user.click(screen.getByText('about'))
  expect(screen.getByText('about us')).toBeInTheDocument()
})

test('네비게이션 훅을 사용하여 모든 화면(스택)을 닫고 새로운 화면(스택)을 출력할 수 있다.', async () => {
  const Dashboard = () => {
    const navigaiton = useNavigation()

    const handleClick = () => {
      navigaiton.push('/about')
    }

    return (
      <div>
        <h1>dashboard</h1>
        <p onClick={handleClick}>about</p>
      </div>
    )
  }
  const AboutUs = () => {
    const navigaiton = useNavigation()

    const handleClick = () => {
      navigaiton.push('/contact')
    }

    return (
      <div>
        <h1>about us</h1>
        <p onClick={handleClick}>contact</p>
      </div>
    )
  }
  const ContactUs = () => {
    const navigaiton = useNavigation()

    const handleClick = () => {
      navigaiton.push('/clear', { clear: true })
    }

    return (
      <div>
        <h1>contact us</h1>
        <p onClick={handleClick}>clear</p>
      </div>
    )
  }

  const Clear = () => {
    return(
      <div>
        <h1>clear screen</h1>
      </div>
    )
  }

  render(
    <ReactStackProvider duration={0} delay={0} progressIndicator={false} loadingComponent={null}>
      <Screen route="/" component={<Dashboard />} animation={AnimationType.None} className={'dashboard'} />
      <Screen route="/about" component={<AboutUs />} animation={AnimationType.None} className={'about'} />
      <Screen route="/contact" component={<ContactUs />} animation={AnimationType.None} className={'contact'} />
      <Screen route="/clear" component={<Clear />} animation={AnimationType.None} className={'clear'} />
    </ReactStackProvider>
  )

  const user = userEvent.setup()

  expect(screen.getByText('dashboard')).toBeInTheDocument()
  expect(document.getElementsByClassName('about').length).toBe(0)

  await user.click(screen.getByText('about'))

  expect(screen.getByText('about us')).toBeInTheDocument()
  expect(document.getElementsByClassName('about').length).toBe(1)
  
  await user.click(screen.getByText('contact'))

  expect(screen.getByText('contact us')).toBeInTheDocument()
  expect(document.getElementsByClassName('contact').length).toBe(1)

  await user.click(screen.getByText('clear'))

  // 호출되었던 모든 스택이 사라지고
  await waitFor(() => expect(document.getElementsByClassName('dashboard').length).toBe(0))
  expect(document.getElementsByClassName('about').length).toBe(0)
  expect(document.getElementsByClassName('contact').length).toBe(0)
  // clear screen 화면만 남는다.
  expect(screen.getByText('clear screen')).toBeInTheDocument()
})

test('네비게이션 훅을 사용하여 현재 화면을 다른 화면으로 바꿀 수 있다.', async () => {
  const Dashboard = () => {
    const navigaiton = useNavigation()

    const handleClick = async () => {
      await navigaiton.replace('/about')
    }

    return (
      <div>
        <h1>dashboard</h1>
        <p onClick={handleClick}>about</p>
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

  render(
    <ReactStackProvider duration={0} delay={0} progressIndicator={false} loadingComponent={null}>
      <Screen route="/" component={<Dashboard />} animation={AnimationType.None} className={'dashboard'} />
      <Screen route="/about" component={<AboutUs />} animation={AnimationType.None} className={'about'} />
    </ReactStackProvider>
  )

  const user = userEvent.setup()

  expect(screen.getByText('dashboard')).toBeInTheDocument()
  expect(document.getElementsByClassName('dashboard').length).toBe(1)

  await user.click(screen.getByText('about'))
  expect(screen.getByText('about us')).toBeInTheDocument()

  // // replace 되었기 때문의 기존의 dashboard 화면은 사라짐.
  expect(document.getElementsByClassName('about').length).toBe(1)
  expect(document.getElementsByClassName('dashboard').length).toBe(0)
})

test('네비게이션 훅을 사용하여 이전 화면(스택)으로 돌아갈 수 있다.', async () => {
  const Dashboard = () => {
    const navigaiton = useNavigation()

    const handleClick = async () => {
      await navigaiton.push('/about')
    }

    return (
      <div>
        <h1>dashboard</h1>
        <p onClick={handleClick}>about</p>
      </div>
    )
  }
  const AboutUs = () => {
    const navigaiton = useNavigation()

    const handleClick = () => {
      navigaiton.back()
    }

    return (
      <div>
        <h1>about us</h1>
        <p onClick={handleClick}>back</p>
      </div>
    )
  }

  render(
    <ReactStackProvider duration={0} delay={0} progressIndicator={false} loadingComponent={null}>
      <Screen route="/" component={<Dashboard />} animation={AnimationType.None} className={'dashboard'} />
      <Screen route="/about" component={<AboutUs />} animation={AnimationType.None} className={'about'} />
    </ReactStackProvider>
  )

  const user = userEvent.setup()

  expect(screen.getByText('dashboard')).toBeInTheDocument()
  expect(document.getElementsByClassName('about').length).toBe(0)

  await user.click(screen.getByText('about'))

  expect(screen.getByText('about us')).toBeInTheDocument()
  expect(document.getElementsByClassName('about').length).toBe(1)
  
  await user.click(screen.getByText('back'))
  
  // 뒤로가기를 사용하였기 때문에 about us 화면을 사라짐.
  await waitFor(() => expect(document.getElementsByClassName('about').length).toBe(0))
  expect(document.getElementsByClassName('dashboard').length).toBe(1)
})


test('네비게이션 훅을 사용하여 여러 이전 화면(스택)으로 돌아갈 수 있다.', async () => {
  const Dashboard = () => {
    const navigaiton = useNavigation()

    const handleClick = () => {
      navigaiton.push('/about')
    }

    return (
      <div>
        <h1>dashboard</h1>
        <p onClick={handleClick}>about</p>
      </div>
    )
  }
  const AboutUs = () => {
    const navigaiton = useNavigation()

    const handleClick = () => {
      navigaiton.push('/contact')
    }

    return (
      <div>
        <h1>about us</h1>
        <p onClick={handleClick}>contact</p>
      </div>
    )
  }
  const ContactUs = () => {
    const navigaiton = useNavigation()

    const handleClick = () => {
      navigaiton.back(2)
    }

    return (
      <div>
        <h1>contact us</h1>
        <p onClick={handleClick}>back two stacks</p>
      </div>
    )
  }

  render(
    <ReactStackProvider duration={0} delay={0} progressIndicator={false} loadingComponent={null}>
      <Screen route="/" component={<Dashboard />} animation={AnimationType.None} className={'dashboard'} />
      <Screen route="/about" component={<AboutUs />} animation={AnimationType.None} className={'about'} />
      <Screen route="/contact" component={<ContactUs />} animation={AnimationType.None} className={'contact'} />
    </ReactStackProvider>
  )

  const user = userEvent.setup()

  expect(screen.getByText('dashboard')).toBeInTheDocument()
  expect(document.getElementsByClassName('about').length).toBe(0)

  await user.click(screen.getByText('about'))

  expect(screen.getByText('about us')).toBeInTheDocument()
  expect(document.getElementsByClassName('about').length).toBe(1)
  
  await user.click(screen.getByText('contact'))

  expect(screen.getByText('contact us')).toBeInTheDocument()
  expect(document.getElementsByClassName('contact').length).toBe(1)

  await user.click(screen.getByText('back two stacks'))

  await waitFor(() => expect(document.getElementsByClassName('about').length).toBe(0))
  expect(document.getElementsByClassName('contact').length).toBe(0)
  expect(document.getElementsByClassName('dashboard').length).toBe(1)
})