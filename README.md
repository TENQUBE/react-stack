>❗ __The current version is being developed and tested internally.__

# @tenqube/react-stack
A library that helps with screen stack routing and transition animation in webviews of hybrid apps.

## Installation
```sh
$ npm install @tenqube/react-stack
```

## Quick Start
```ts
import React from 'react'
import ReactDOM from 'react-dom/client'
import ReactStackProvider, { Screen, Link, AnimationType } from '@tenqube/react-stack'

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
    <Screen route="/" component={<White />} animation={AnimationType.None} />
    <Screen route="/black" component={<Black />} animation={AnimationType.ToLeft} />
    <Screen route="/red" component={<Red />} animation={AnimationType.Scale} />
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
  <Screen route="/black/:type" component={<Black />} animation={AnimationType.ToLeft} />
</ReactStackProvider>
```
The pathvarialbe value can be checked with the component's 'parmas' Props.
```ts
// ex. URI path '/black/color'
const Black = ({ params }) => {
  console.log(params) // { type: color }
  ...
```

## Hooks

### useNavigation
The push and replace methods operate the same as 'window.history.pushState' and 'window.history.replaceState'. The back method is similar to 'window.history.back', but provides the size to move back to as a parameter.
> If you use 'window.history.pushState' or 'window.history.replaceState' directly, there may be issues with stack history management. Please use a hook.
```ts
...
import { useNavigation } from '@tenqube/react-stack'

const White = () => {
  const navigation = useNavigation()

  const handleClickPushEvent = () => {
    navigation.push('/black')
  }

  const handleClickReplaceEvent = () => {
    navigation.replace('/black')
  }

  const handleClickBack = () => {
    navigation.back()
    // Go back one step
    // history.back(2) - Go back two steps
  }

  ...
}
```

```ts
interface INavigation {
  push: (to: string, state?: INavigationPushState) => void
  replace: (to: string) => void
  back: (to?: number) => void
}
```

```ts
interface INavigationPushState {
  clear: boolean
}
```

### useStacks
You can see which stack is active.
```ts
...
import { useStacks } from '@tenqube/react-stack'

const White = () => {
  const stacks = useStacks()

  useEffect(() => {
    console.log(stacks)
  }, [stacks])

  ...
}
```
```ts
interface IScreen {
  readonly route?: string
  readonly component?: ReactNode
  readonly animation?: AnimationType
}
```