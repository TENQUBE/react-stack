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
      <h1>Red</h1>
      <Link to="#aaa">#aaa</Link>
      <br />
      <Link to="#bbb">#bbb</Link>
      <br />
      <Link to="/black?aaa=aaa">/black</Link>
      <br />
      <Link to="/blue">/blue</Link>
      {/* <p onClick={() => {
        navigation.replace('/blue')
      }}>relpace</p> */}
    </div>
  )
}