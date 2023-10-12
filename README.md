>❗ __The current version is being developed and tested internally.__

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
import HybridStackProvider, { AnimationType, HybridRoute, HybridLink } from '@tenqube/hybrid-webview-stack'

const container = document.getElementById('wrap') as HTMLElement
const root = ReactDOM.createRoot(container)

const styles: any = {
  background: '#fff',
  position: 'absolute',
  width: '100%',
  height: '100%'
}

const White = () => {
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
```

## Enum
Supports 4 route transition animations.
```ts
enum AnimationType {
  None,
  ToLeft,
  ToTop,
  Scale,
}
```

## Hooks

### useHybridRouter
Currently, push and go methods are provided.  
The push method is equivalent to 'history.pushState' and the go method is equivalent to 'history.go', but currently only provides negative numbers (going back).
```ts
...
import { useHybridRouter, IHybridRouter } from '@tenqube/hybrid-webview-stack'

const White = () => {
  const router: IHybridRouter = useHybridRouter()

  const handleClickEvent = () => {
    router.push('/black')
  }

    const handleClickBack = () => {
    router.go(-1)
  }

  ...
}
```
```ts
interface IHybridRouter {
  push: (to: string) => void
  go: (to: number) => void
}
```