import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import HybridStackProvider, { AnimationType, HybridRoute, HybridLink, useHybridRouter, useHybridStack } from '../dist/esm/'

const container = document.getElementById('wrap') as HTMLElement
const root = ReactDOM.createRoot(container)

const styles: any = {
  background: '#fff',
  position: 'absolute',
  width: '100%',
  height: '100%'
}

const White = () => {
  const [stack, totalStack] = useHybridStack()

  useEffect(() => {
    console.log(stack)
    console.log(totalStack)
  }, [stack, totalStack])

  return (
    <div style={{...styles}}>
      <h1>white</h1>
      <HybridLink to="/black?id=aa">/black</HybridLink>
      <br />
      {/* <HybridLink to="/black/test/test/test">/*</HybridLink>
      <br />
      <HybridLink to="/blue/test/red">/blue/:test/red</HybridLink> */}
      <br />
      <HybridLink to="/black/boo/black">/black/:test/black</HybridLink>
    </div>
  )
}

const Black = ({ params }) => {
  const router: any = useHybridRouter()
  const [stack, totalStack] = useHybridStack()
  console.log(params)

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
    <HybridRoute route="/black/:test/black" component={<Black />} animation={AnimationType.ToLeft} />
    <HybridRoute route="/blue" component={<Blue />} animation={AnimationType.ToTop} />
    <HybridRoute route="/red" component={<Red />} animation={AnimationType.ToTop} />
  </HybridStackProvider>
)