import React, { useEffect } from 'react'
import ReactStackProvider, { AnimationType, Screen, useNavigation, useStacks } from '../dist/esm'
import Black from './components/Black'
import Blue from './components/Blue'
import Red from './components/Red'

const styles: any = {
  background: '#fff',
  position: 'absolute',
  width: '100%',
  height: '100%'
}

const White = () => {
  const stacks = useStacks()
  const navigation = useNavigation()

  useEffect(() => {
    console.log(stacks)
  }, [stacks])

  const onClick = () => {
    navigation.push('/black')
  }

  return (
    <div style={{...styles}}>
      <h1>white</h1>
      {/* <Link to="/black">/black</Link> */}
      <p onClick={onClick}>/black2</p>
    </div>
  )
}

export default () => {
  return (
    <ReactStackProvider>
      <Screen route="/" component={<White />} animation={AnimationType.None} />
      <Screen route="/black/:test/black" component={<Black />} animation={AnimationType.ToLeft} />
      <Screen route="/blue" component={<Blue />} animation={AnimationType.Scale} />
      <Screen route="/red" component={<Red />} animation={AnimationType.ToTop} />
    </ReactStackProvider>
  )
}