import React from 'react'
import { Link, useNavigation } from '../../dist/esm'
const styles: any = {
  background: '#fff',
  position: 'absolute',
  width: '100%',
  height: '100%'
}

export default () => {
  const navigation = useNavigation()

  return (
    <div style={{...styles}}>
      <h1>black</h1>
      <Link to="#aaa">#aaa</Link>
      <p onClick={() => {
        navigation.push('/', { clear: true })
      }}>/white - clear</p>
      <br />
      <Link to="/red">/red#bbb</Link>
    </div>
  )
}