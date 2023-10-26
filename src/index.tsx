import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import ReactStackProvider, { Screen, Link, AnimationType, useNavigation, useStacks } from '../dist/esm/'

const container = document.getElementById('wrap') as HTMLElement
const root = ReactDOM.createRoot(container)

const styles: any = {
  background: '#fff',
  position: 'absolute',
  width: '100%',
  height: '100%'
}

const White = () => {
  const stacks = useStacks()

  useEffect(() => {
    console.log(stacks)
  }, [stacks])

  return (
    <div style={{...styles}}>
      <h1>white</h1>
      <Link to="#aaa">#aaa</Link>
      <br />
      <Link to="#bbb">#bbb</Link>
      <br />
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

const Black = () => {
  const navigation: any = useNavigation()

  const handleLinkClick = () => {
    // if(allStacks.length > 4) {
      // history.back(3)
      // history.push('/', { clear: true })
    // } else {
      navigation.back()
    // }
  }

  return (
    <div style={{...styles}}>
      <h1>black</h1>
      <Link to="#aaa">#aaa</Link>
      <br />
      <Link to="#bbb">#bbb</Link>
      <br />
      <p onClick={handleLinkClick}>/red</p>
      <br />
      <Link to="/red#bbb">/red#bbb</Link>
    </div>
  )
}

const Red = () => {
  return (
    <div style={{...styles}}>
      <h1>Red</h1>
      <Link to="#aaa">#aaa</Link>
      <br />
      <Link to="#bbb">#bbb</Link>
      <br />
      <Link to="/blue">/blue</Link>
    </div>
  )
}

const Blue = () => {
  return (
    <div style={{...styles}}>
      <h1>blue</h1>
      <Link to="#aaa">#aaa</Link>
      <br />
      <Link to="#bbb">#bbb</Link>
      <br />
      <Link to="/">/white</Link>
    </div>
  )
}

root.render(
  <ReactStackProvider>
    <Screen route="/" component={<White />} animation={AnimationType.None} />
    <Screen route="/black/:test/black" component={<Black />} animation={AnimationType.ToLeft} />
    <Screen route="/blue" component={<Blue />} animation={AnimationType.ToTop} />
    <Screen route="/red" component={<Red />} animation={AnimationType.ToTop} />
  </ReactStackProvider>
)