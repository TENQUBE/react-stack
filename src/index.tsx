import React from 'react'
import ReactDOM from 'react-dom/client'

import HybridStackProvider, { AnimationType, HybridRoute } from '../dist/esm/'

const App = () => (
  <p>hello world</p>
)

const White = () => {
  const handleClick = () => {
    window.history.pushState({}, "", '/black')
  }
  return (
    <div>
      <h1>white</h1>
      <p onClick={handleClick}>/black</p>
    </div>
  )
}

const Black = () => {
  const handleClick = () => {
    window.history.pushState("", "", '/red')
  }
  return (
    <div>
      <h1>black</h1>
      <p onClick={handleClick}>/red</p>
    </div>
  )
}

const Red = () => {
  const handleClick = () => {
    window.history.pushState("", "", '/')
  }
  return (
    <div>
      <h1>Red</h1>
      <p onClick={handleClick}>/white</p>
    </div>
  )
}
const container = document.getElementById('wrap') as HTMLElement
const root = ReactDOM.createRoot(container)

root.render(
  <HybridStackProvider>
    <HybridRoute route="/" component={<White />} animation={AnimationType.None} />
    <HybridRoute route="/black" component={<Black />} animation={AnimationType.None} />
    <HybridRoute route="/red" component={<Red />} animation={AnimationType.None} />
  </HybridStackProvider>
)