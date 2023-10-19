import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import ReactStackProvider, { Route, Link, AnimationType, useStackRouter, useStacks } from '../dist/esm/'

const container = document.getElementById('wrap') as HTMLElement
const root = ReactDOM.createRoot(container)

const styles: any = {
  background: '#fff',
  position: 'absolute',
  width: '100%',
  height: '100%'
}

const White = () => {
  const [stack, totalStack] = useStacks()

  useEffect(() => {
    console.log(stack)
    console.log(totalStack)
  }, [stack, totalStack])

  return (
    <div style={{...styles}}>
      <h1>white</h1>
      <Link to="/black?id=aa">/black</Link>
      <br />
      {/* <Link to="/black/test/test/test">/*</Link>
      <br />
      <Link to="/blue/test/red">/blue/:test/red</Link> */}
      <br />
      <Link to="/black/boo/black">/black/:test/black</Link>
    </div>
  )
}

const Black = (pathVariable) => {
  const router: any = useStackRouter()
  const [stack, totalStack] = useStacks()
  console.log(pathVariable.params)

  const handleLinkClick = () => {
    // if(totalStack.length > 4) {
      // router.back(3)
      // router.push('/blue', { clear: true })
    // } else {
      router.push('/red#aaa')
    // }
  }

  return (
    <div style={{...styles}}>
      <h1>black</h1>
      <p onClick={handleLinkClick}>/red</p>
    </div>
  )
}

const Red = () => {
  return (
    <div style={{...styles}}>
      <h1>Red</h1>
      <Link to="/blue">/blue</Link>
    </div>
  )
}

const Blue = () => {
  return (
    <div style={{...styles}}>
      <h1>blue</h1>
      <Link to="/">/white</Link>
    </div>
  )
}

root.render(
  <ReactStackProvider>
    <Route route="/" component={<White />} animation={AnimationType.None} />
    <Route route="/black/:test/black" component={<Black />} animation={AnimationType.ToLeft} />
    <Route route="/blue" component={<Blue />} animation={AnimationType.ToTop} />
    <Route route="/red" component={<Red />} animation={AnimationType.ToTop} />
  </ReactStackProvider>
)