>❗ __The current version is being developed and tested internally.__

# @tenqube/react-stack
A library that helps with screen stack routing and transition animation in webviews of hybrid apps.  
(for React)

## Installation
```sh
$ npm install @tenqube/react-stack
```

## Quick Start
```ts
import React from 'react'
import ReactDOM from 'react-dom/client'
import ReactStackProvider, { Route, Link, AnimationType } from '@tenqube/react-stack'

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
      <Link to="/black">/black</Link>
    </div>
  )
}

const Black = () => {
  return (
    <div style={{...styles}}>
      <h1>black</h1>
      <Link to="/red">/red</Link>
    </div>
  )
}

const Red = () => {
  return (
    <div style={{...styles}}>
      <h1>Red</h1>
      <Link to="/">/white</Link>
    </div>
  )
}

root.render(
  <ReactStackProvider>
    <Route route="/" component={<White />} animation={AnimationType.None} />
    <Route route="/black" component={<Black />} animation={AnimationType.ToLeft} />
    <Route route="/red" component={<Red />} animation={AnimationType.Scale} />
  </ReactStackProvider>
)
```

## Anumations
Supports 4 route transition animations.
```ts
enum AnimationType {
  None,
  ToLeft,
  ToTop,
  Scale
}
```

## Route

### Dynamic Routing
If a route segment starts with : then it becomes a pathvariable.
```ts
<ReactStackProvider>
  <Route route="/black/:color" component={<Black />} animation={AnimationType.ToLeft} />
</ReactStackProvider>
```
The pathvarialbe value can be checked with the component's 'parmas' Props.
```ts
// ex. URI path '/color/red'
const Black = ({ params }) => {
  console.log(params) // red
  ...
```

## Hooks

### useStackRouter
Currently push and back methods are provided.
The push method is the same as 'history.pushState' and the back method is similar to 'history.back', but provides the size to move back as a parameter.
```ts
...
import { useStackRouter, IStackRouter } from '@tenqube/react-stack'

const White = () => {
  const router: IStackRouter = useStackRouter()

  const handleClickEvent = () => {
    router.push('/black')
  }

  const handleClickBack = () => {
    router.back()
    // Go back one step
    // router.back(2) - Go back two steps
  }

  ...
}
```

```ts
export interface IRoutePushState {
  clear: boolean
}
```

```ts
interface IStackRouter {
  push: (to: string, state?: IRoutePushState) => void
  replaceState: (to: string) => void
  back: (to?: number) => void
}
```

### useStacks
You can see which stack is active.
```ts
...
import { useStacks, IStack } from '@tenqube/react-stack'

const White = () => {
  const [stack, totalStack]: [IStack, IStack | string] = useStacks()

  useEffect(() => {
    console.log(stack) // only view component stack
    console.log(totalStack) // Includes history stack due to hash
  }, [totalStack])

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