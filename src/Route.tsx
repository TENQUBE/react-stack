import React, { useEffect } from 'react'
import ReactStackProvider, { Toast, AnimationType, BottomSheet, Screen, useNavigation, useStacks } from '../dist/esm'
import Black from './components/Black'
import Blue from './components/Blue'
import Red from './components/Red'
import Yellow from './components/Yellow'

const styles: any = {
  background: '#fff',
  position: 'absolute',
  width: '100%',
  height: '100%',
  overflow: 'auto'
}

const White = () => {
  const stacks = useStacks()
  const navigation = useNavigation()

  useEffect(() => {
    console.log(stacks)
  }, [stacks])

  const onClick = () => {
    navigation.push('/yellow')
  }

  return (
    <div style={{...styles}}>
      <h1>white</h1>
      <br /><br />
      <p onClick={onClick}>/yellow</p>
    </div>
  )
}

export default () => {
  return (
    <ReactStackProvider duration={400} delay={400}>
      <Screen route="/" component={<White />} animation={AnimationType.None} className={''}/>
      {/* <Screen route="/black/:test/black" component={<Black />} animation={AnimationType.Scale} /> */}
      <BottomSheet route="/black" isExpandabled={false} height={500} component={<Black />} className={'tttttt ssssss'} />
      <Toast route="/blue" component={<Blue />} className={''} />
      {/* <Screen route="/blue" component={<Blue />} animation={AnimationType.ToLeft} /> */}
      <Screen route="/red" component={<Red />} animation={AnimationType.Scale} className={''} />
      <Screen route="/yellow" component={<Yellow />} animation={AnimationType.ToTop} className={''} />
    </ReactStackProvider>
  )
}