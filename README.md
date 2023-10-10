# @tenqube/hybrid-webview-stack
This is a library that helps with screen stack routing and transition animation in web views of mobile web and hybrid apps.

## Installation
```sh
$ npm install @tenqube/hybrid-webview-stack
```

## Quick Start
```ts
import React from 'react'
import ReactDOM from 'react-dom/client'

import HybridStackProvider, { AnimationType, HybridRoute } from '@tenqube/hybrid-webview-stack'

const styles: any = {
  background: '#fff',
  position: 'absolute',
  width: '100%',
  height: '100%'
}

const White = () => {
  const handleClick = () => {
    window.history.pushState({}, "", '/black')
  }
  return (
    <div style={{...styles}}>
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
    <div style={{...styles}}>
      <h1>black</h1>
      <p onClick={handleClick}>/red</p>
    </div>
  )
}

const Red = () => {
  const handleClick = () => {
    window.history.pushState("", "", '/blue')
  }
  return (
    <div style={{...styles}}>
      <h1>Red</h1>
      <p onClick={handleClick}>/blue</p>
    </div>
  )
}

const Blue = () => {
  const handleClick = () => {
    window.history.pushState("", "", '/')
  }
  return (
    <div style={{...styles}}>
      <h1>blue</h1>
      <p onClick={handleClick}>/white</p>
    </div>
  )
}
const container = document.getElementById('wrap') as HTMLElement
const root = ReactDOM.createRoot(container)

root.render(
  <HybridStackProvider>
    <HybridRoute route="/" component={<White />} animation={AnimationType.None} />
    <HybridRoute route="/black" component={<Black />} animation={AnimationType.ToLeft} />
    <HybridRoute route="/red" component={<Red />} animation={AnimationType.Scale} />
    <HybridRoute route="/blue" component={<Blue />} animation={AnimationType.ToTop} />
  </HybridStackProvider>
)
```