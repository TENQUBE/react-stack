import React, { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
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
    <RecoilRoot>
      <ReactStackProvider duration={400} delay={400}>
        <Screen route="/" component={<White />} animation={AnimationType.None} />
        {/* <Screen route="/black/:test/black" component={<Black />} animation={AnimationType.Scale} /> */}
        <BottomSheet route="/black" isExpandabled={false} height={500} component={<Black />} />
        <Toast route="/blue" component={<Blue />} />
        {/* <Screen route="/blue" component={<Blue />} animation={AnimationType.ToLeft} /> */}
        <Screen route="/red" component={<Red />} animation={AnimationType.Scale} />
        <Screen route="/yellow" component={<Yellow />} animation={AnimationType.ToTop} />
      </ReactStackProvider>
    </RecoilRoot>
  )
}