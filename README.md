# @tenqube/react-stack
A library that helps with screen stack routing and transition animation in webviews of hybrid apps.

## Language
[🇺🇲](https://github.com/TENQUBE/react-stack) [🇰🇷](https://github.com/TENQUBE/react-stack/blob/master/README-KO.md)

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
  background: '#fff'
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
Supports 5 route transition animations.
```ts
enum AnimationType {
  None,
  ToLeft,
  ToTop,
  Scale,
  Fade
}
```

## Components

### Provider
```ts
root.render(
  <ReactStackProvider duration={400} delay={200} progressIndicator={true} loadingComponent={null}>
    ...
  </ReactStackProvider>
)
```

```ts
interface ProviderProps {
  duration?: number // default 350 - Animation duration of stack transitions
  delay?: number // default 150 - Animation delay of stack transitions
  progressIndicator?: boolean // default true - Whether to use progress indicators
  loadingComponent?: ReactElement // You can customize the progress indicator
}
```

### Screen
You can use the 'Screen' component to configure the entire screen view according to Pathname.
```ts
root.render(
  <ReactStackProvider>
    <Screen route="/" component={<White />} animation={AnimationType.None} />
    ...
  </ReactStackProvider>
)
```

```ts
interface ScreenProps {
  route?: string // default '*' - Sets the target URI path name.
  component: ReactElement // Enter the component to be output to the route.
  animation?: AnimationType // default AnimationType.None - Animation delay of stack transitions
  useInitialAnimation?: boolean // default true - Set whether to use animation when rendering the initial screen
  className?: string // Set the class name of the stack.
}
```

#### 404 Not Found
You can configure the 404 screen by using the '*' route at the end inside the ReactStackProvider.
```ts
root.render(
  <ReactStackProvider>
    ...
    <Screen route="*" component={<NotFound />} />
  </ReactStackProvider>
)
```

### BottomSheet Dialog
You can use the 'BottomSheet' component to configure a bottom sheet type view.
```ts
import React from 'react'
import ReactDOM from 'react-dom/client'
import ReactStackProvider, { Screen, BottomSheet, Link, AnimationType } from '@tenqube/react-stack'

const container = document.getElementById('wrap') as HTMLElement
const root = ReactDOM.createRoot(container)

const styles: any = {
  background: '#fff'
}

const Dashobard = () => {
  return (
    <div style={{...styles}}>
      <h1>dashboard</h1>
      <Link to="/bottomsheet">/bottomsheet</Link>
    </div>
  )
}

const Bottomsheet = () => {
  return (
    <div style={{...styles}}>
      <h1>bottomsheet</h1>
    </div>
  )
}

root.render(
  <ReactStackProvider>
    <Screen route="/" component={<Dashboard />} animation={AnimationType.None} />
    <BottomSheet route="/bottomsheet" component={<Black />} height={400} isExpandabled={false} />
  </ReactStackProvider>
)
```

```ts
interface BottomSheetProps {
  route?: string // default '*' - Sets the target URI path name.
  component: ReactElement // Enter the component to be output to the route.
  className?: string // Set the class name of the stack.
  height?: number // Set the height of the botoom sheet.
  isExpandabled?: boolean // Set whether to expand to full screen by dragging.
}
```

### Toast
You can use the 'Toast' component to configure a toast box-shaped view.
```ts
import React from 'react'
import ReactDOM from 'react-dom/client'
import ReactStackProvider, { Screen, Toast, Link, AnimationType } from '@tenqube/react-stack'

const container = document.getElementById('wrap') as HTMLElement
const root = ReactDOM.createRoot(container)

const styles: any = {
  background: '#fff'
}

const Dashobard = () => {
  return (
    <div style={{...styles}}>
      <h1>dashboard</h1>
      <Link to="/toastbox">/toastbox</Link>
    </div>
  )
}

const ToastBox = () => {
  return (
    <div style={{...styles}}>
      <h1>toastbox</h1>
    </div>
  )
}

root.render(
  <ReactStackProvider>
    <Screen route="/" component={<Dashboard />} animation={AnimationType.None} />
    <Toast route="/toastbox" component={<ToastBox />} />
  </ReactStackProvider>
)
```

```ts
interface ToastProps {
  route?: string // default '*' - Sets the target URI path name.
  component: ReactElement // Enter the component to be output to the route.
  className?: string // Set the class name of the stack.
}
```

## Route

### Dynamic Routing
If a route segment starts with : then it becomes a pathvariable.
```ts
root.render(
  <ReactStackProvider>
    <Screen route="/color/:color" component={<Black />} animation={AnimationType.ToLeft} />
  </ReactStackProvider>
)
```
The pathvarialbe value can be checked with the component's 'parmas' Props.
```ts
// ex. URI path '/color/red'
const Black = ({ params }) => {
  console.log(params) // { color: red }
  
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

If you set the clear option, all previous stacks will disappear and only the requested screen will be displayed.

```ts
  const handleClickEvent = async () => {
    await navigation.back()
    await navigation.back()
    navigation.push('/black')
  }
```

If you need to use it continuously as above, you can implement it using async and await.

### useStacks
You can see which stack is active.
```ts
...
import { useStacks } from '@tenqube/react-stack'

const White = () => {
  const stacks: IScreen[] = useStacks()

  useEffect(() => {
    console.log(stacks)
  }, [stacks])

  ...
}
```
```ts
interface IScreen {
  readonly route?: string
  readonly component?: ReactElement | null
  readonly animation?: AnimationType
  readonly className?: string
  readonly useInitialAnimation?: boolean
  id: string
  pathVariable: unknown
  URIPath: string
  hash: string
}
```

### useLoading
You can call a progress indicator.
```ts
const Dashboard = () => {
  const setLoading = useLoading()

  const handleClick = () => {
    setLoading()
  }

  return (
    <div>
      <h1>dashboard</h1>
      <p onClick={handleClick}>loading</p>
    </div>
  )
}
```