import React from 'react'
import { useNavigation } from '../../dist/esm'
const styles: any = {
  background: 'red',
  width: '200px',
  height: '120px',
  borderRadius: '30px',
  textAlign: 'center'
}

export default () => {
  const navigation = useNavigation()

  return (
    <div style={{...styles}}>
      <h1>blue</h1>
      <p onClick={() => {
        navigation.push('/yellow')
      }}>yellow</p>
    </div>
  )
}