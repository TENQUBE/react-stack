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
      <HybridLink to="/">/white</HybridLink>
    </div>
  )
}

root.render(
  <HybridStackProvider>
    <HybridRoute route="/" component={<White />} animation={AnimationType.None} />
    <HybridRoute route="/black" component={<Black />} animation={AnimationType.ToLeft} />
    <HybridRoute route="/red" component={<Red />} animation={AnimationType.Scale} />
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
  Scale
}
```

## Hooks

### useHybridRouter
Currently push and back methods are provided.
The push method is the same as 'history.pushState' and the back method is similar to 'history.back', but provides the size to move back as a parameter.
```ts
...
import { useHybridRouter, IHybridRouter } from '@tenqube/hybrid-webview-stack'

const White = () => {
  const router: IHybridRouter = useHybridRouter()

  const handleClickEvent = () => {
    router.push('/black')
  }

  const handleClickBack = () => {
    router.back()
  }

  ...
}
```
```ts
interface IHybridRouter {
  push: (to: string) => void
  back: (to: number) => void
}
```

### useHybridStack
You can see which stack is active.
```ts
...
import { useHybridStack, IStack } from '@tenqube/hybrid-webview-stack'

const White = () => {
  const stack: IStack = useHybridStack()

  useEffect(() => {
    console.log(stack)
  }, [stack])

  ...
}
```
```ts
interface IStack {
  readonly route: string
  readonly component: ReactNode
  readonly animation: AnimationType
}
```