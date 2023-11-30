# @tenqube/react-stack
모바일 웹 또는 하이브리드 앱의 웹뷰에서 화면 스택 라우팅 및 전환 애니메이션을 제공하는 라이브러리입니다.

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
아래 5가지의 화면 전환 애니메이션을 제공합니다.
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
  duration?: number // default 350 - 화면 전환 애니메이션의 지속 시간입니다. (1000 = 1s)
  delay?: number // default 150 - 화면 전환 애니메이션의 지연 시간 입니다. (1000 = 1s)
  progressIndicator?: boolean // default true - 프로그레스 인디케이터 사용 여부를 정합니다.
  loadingComponent?: ReactElement // 프로그레스 인디케티어를 컴포넌트 형태로 설정할 수 있습니다.
}
```

### Screen
Screen 컴포넌트를 사용하여 Pathname에 따른 전체 화면의 뷰를 구성할 수 있습니다.
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
  route?: string // 기본값 '*' - 컴포넌트를 출력할 URI Pathname을 설정합니다.
  component: ReactElement // route에 출력할 컴포넌트를 설정합니다.
  animation?: AnimationType // 기본값 AnimationType.None - 화면 전환간 사용할 애니메이션을 설정합니다.
  className?: string // 해당 스택의 class name을 설정합니다.
}
```

#### 404 Not Found
ReactStackProvider 안의 마지막에 '*' 라우트를 사용하여 404 화면을 구성 할 수 있습니다.
```ts
root.render(
  <ReactStackProvider>
    ...
    <Screen route="*" component={<NotFound />} />
  </ReactStackProvider>
)
```

### BottomSheet Dialog
BottomSheet 컴포넌트를 사용하여 바텀시트 형태의 뷰를 구성할 수 있습니다.
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
  route?: string // 기본값 '*' - 컴포넌트를 출력할 URI Pathname을 설정합니다.
  component: ReactElement // route에 출력할 컴포넌트를 설정합니다.
  className?: string // 해당 스택의 class name을 설정합니다.
  height?: number // 바텀시트의 높이값을 설정합니다.
  isExpandabled?: boolean // 드래그하여 전체 화면으로 확장가능 여부를 설정합니다.
}
```

### Toast
Toast 컴포넌트를 사용하여 토스트 박스 형태의 뷰를 구성할 수 있습니다.
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
  route?: string // 기본값 '*' - 컴포넌트를 출력할 URI Pathname을 설정합니다.
  component: ReactElement // route에 출력할 컴포넌트를 설정합니다.
  className?: string // 해당 스택의 class name을 설정합니다.
}
```

## Route

### 동적 라우팅
route 경로에 ':'으로 시작하면 경로 변수로 사용할 수 있습니다.
```ts
root.render(
  <ReactStackProvider>
    <Screen route="/color/:color" component={<Black />} animation={AnimationType.ToLeft} />
  </ReactStackProvider>
)
```
사용된 경로 변수 값은 컴포넌트의 'params' Props를 통해 사용할 수 있습니다.
```ts
// ex. URI path '/color/red'
const Black = ({ params }) => {
  console.log(params) // { color: red }

  ...
```

## Hooks

### useNavigation
'push' 및 'replace' 메소드는 'window.history.pushState' 및 'window.history.replaceState'와 동일하게 작동합니다. 'back' 메소드는 'window.history.back'과 유사하지만, 이동할 히스토리의 단계를 파라미터로 제공합니다.
> 'window.history.pushState' 또는 'window.history.replaceState'를 직접 사용하는 경우 스택 히스토리가 관리되지 않아 문제가 발생합니다. useNavigation 훅을 사용해주세요.
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
    // 이전 화면으로 이동합니다. (마지막 스택을 종료합니다.)
    // history.back(2) - 두화면 전으로 이동합니다. (마지막 두개의 스택을 종료합니다.)
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

'push' 메서드에서 'clear' 옵션을 설정하면 이전 모든 스택이 종료되고 마지막 'push'에서 요청한 route의 화면만 출력됩니다.

```ts
  const handleClickEvent = async () => {
    await navigation.back()
    await navigation.back()
    navigation.push('/black')
  }
```

만약 위와 같이 연속적으로 사용해야 한다면, async, await를 사용하여 구현할 수 있습니다.

### useStacks
출력되어 있는 모든 스택의 정보를 확인 할 수 있습니다.

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
  pathVariable: unknown
  URIPath: string
  hash: string
}
```


### useLoading
프로그레스 인디케이터를 호출할 수 있습니다.
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