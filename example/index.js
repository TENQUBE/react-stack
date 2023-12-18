import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import ReactStackProvider, { AnimationType, Screen, useNavigation, useStacks } from '../dist/esm'

const container = document.getElementById('wrap')
const root = ReactDOM.createRoot(container)

const Home = () => {
  const stacks = useStacks()
  const navigation = useNavigation()

  useEffect(() => {
    console.log(stacks)
  }, [stacks])

  const onClick = () => {
    navigation.push('/yellow')
  }

  const onGreenClick = () => {
    navigation.push('/green')
  }

  return (
    <div style={{ background: '#fff', height: '100%' }}>
      <h1>Home</h1>
      <button onClick={onClick}>/yellow</button>
      <button onClick={onGreenClick}>/green</button>
    </div>
  )
}

const Yellow = () => {
  const stacks = useStacks()
  const navigation = useNavigation()

  useEffect(() => {
    console.log(stacks)
  }, [stacks])

  const onClick = () => {
    navigation.push('/green')
  }

  const onClickBack = () => {
    navigation.back()
  }

  const onClickClear = () => {
    navigation.push('/', { clear: true })

    // clear시 animation이 어색함
  }

  const onClickReplace = () => {
    navigation.replace('/', { clear: true })
  }

  return (
    <div style={{ background: 'blue', height: '100%' }}>
      <h1>yellow</h1>
      <button onClick={onClick}>green</button>
      <button onClick={onClickBack}>back</button>
      <button onClick={onClickClear}>clear</button>
      <button onClick={onClickReplace}>replace</button>
    </div>
  )
}

const Green = () => {
  const stacks = useStacks()
  const navigation = useNavigation()

  useEffect(() => {
    console.log(stacks)
  }, [stacks])

  const onClick = () => {
    navigation.back()
  }

  const onClickClear = async () => {
    navigation.push('/', { clear: true })
    // await navigation.back()
    // navigation.replace('/')
  }

  const onClickReplace = () => {
    navigation.replace('/black', { clear: true })
  }

  const onClickBlack = () => {
    navigation.push('/black')
  }

  return (
    <div style={{ background: '#fff', height: '100%' }}>
      <h1>green</h1>
      <button onClick={onClick}>back</button>
      <button onClick={onClickClear}>clear</button>
      <button onClick={onClickReplace}>replace black</button>
      <button onClick={onClickBlack}>black</button>
    </div>
  )
}

const Black = () => {
  const stacks = useStacks()
  const navigation = useNavigation()

  useEffect(() => {
    console.log(stacks)
  }, [stacks])

  const onClick = () => {
    navigation.back()
  }

  const onClickClear = async () => {
    navigation.push('/yellow', { clear: true })
    // await navigation.back()
    // navigation.replace('/')
  }

  const onClickReplace = () => {
    navigation.replace('/black')
  }

  return (
    <div style={{ background: '#fff', height: '100%' }}>
      <h1>Black</h1>
      <button onClick={onClick}>back</button>
      <button onClick={onClickClear}>yellow clear</button>
      <button onClick={onClickReplace}>replace black</button>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <ReactStackProvider duration={1000} delay={200} progressIndicator={true}>
        <Screen route="/" component={<Home />} animation={AnimationType.None} />
        <Screen route="/yellow" component={<Yellow />} animation={AnimationType.ToLeft} />
        <Screen route="/green" component={<Green />} animation={AnimationType.ToLeft} />
        <Screen route="/black" component={<Black />} animation={AnimationType.ToLeft} />
      </ReactStackProvider>
    </div>
  )
}

root.render(<App />)
