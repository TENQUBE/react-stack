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

  return (
    <div style={{ background: '#fff' }}>
      <h1>Home</h1>
      <button onClick={onClick}>/yellow</button>
    </div>
  )
}

const Yellow = () => {
  const navigation = useNavigation()

  const onClick = () => {
    navigation.push('/green')
  }

  return (
    <div style={{ background: '#fff' }}>
      <h1>yellow</h1>
      <button onClick={onClick}>green</button>
    </div>
  )
}

const Green = () => {
  const navigation = useNavigation()

  const onClick = () => {
    navigation.back()
  }

  return (
    <div style={{ background: '#fff' }}>
      <h1>green</h1>
      <button onClick={onClick}>back</button>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <ReactStackProvider
        duration={400}
        delay={200}
        progressIndicator={true}
        loadingComponent={null}
      >
        <Screen route="/" component={<Home />} animation={AnimationType.None} />
        <Screen route="/yellow" component={<Yellow />} animation={AnimationType.ToLeft} />
        <Screen route="/green" component={<Green />} animation={AnimationType.ToLeft} />
      </ReactStackProvider>
    </div>
  )
}

root.render(<App />)
