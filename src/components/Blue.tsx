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
      <h1>blue</h1>
      <Link to="#aaa">#aaa</Link>
      <br />
      <Link to="#bbb">#bbb</Link>
      <br />
      <p onClick={() => {
        navigation.back(3)
      }}>/yellow</p>
    </div>
  )
}