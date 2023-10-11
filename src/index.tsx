import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import HybridStackProvider, { AnimationType, HybridRoute, HybridLink, useLocationHistory } from '../dist/esm/'

const container = document.getElementById('wrap') as HTMLElement
const root = ReactDOM.createRoot(container)

const styles: any = {
  background: '#fff',
  position: 'absolute',
  width: '100%',
  height: '100%'
}

const White = () => {
  const history = useLocationHistory()

  useEffect(() => {
    console.log(history)
  }, [history])

  return (
    <div style={{...styles}}>
      <h1>white</h1>
      <HybridLink to="/black">/black</HybridLink>
    </div>
  )
}

const Black = () => {
  return (
    <div style={{...styles}}>
      <h1>black</h1>
      <HybridLink to="/red">/red</HybridLink>
    </div>
  )
}

const Red = () => {
  return (
    <div style={{...styles}}>
      <h1>Red</h1>
      <HybridLink to="/blue">/blue</HybridLink>
    </div>
  )
}

const Blue = () => {
  return (
    <div style={{...styles}}>
      <h1>blue</h1>
      <HybridLink to="/">/white</HybridLink>
    </div>
  )
}

root.render(
  <HybridStackProvider>
    <HybridRoute route="/" component={<White />} animation={AnimationType.None} />
    <HybridRoute route="/black" component={<Black />} animation={AnimationType.ToLeft} />
    <HybridRoute route="/red" component={<Red />} animation={AnimationType.Scale} />
    <HybridRoute route="/blue" component={<Blue />} animation={AnimationType.ToTop} />
  </HybridStackProvider>
)