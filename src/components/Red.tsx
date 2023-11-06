import React from 'react'
import { Link } from '../../dist/esm'
const styles: any = {
  background: '#fff',
  position: 'absolute',
  width: '100%',
  height: '100%'
}

export default () => {
  return (
    <div style={{...styles}}>
      <h1>Red</h1>
      <Link to="#aaa">#aaa</Link>
      <br />
      <Link to="#bbb">#bbb</Link>
      <br />
      <Link to="/blue#aaa">/blue</Link>
    </div>
  )
}