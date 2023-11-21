import React from 'react'
import { Link, useNavigation } from '../../dist/esm'
const styles: any = {
  background: '#fff',
  position: 'absolute',
  width: '100%',
  height: '100%'
}

export default () => {
  const navigaiton = useNavigation()

  const handleClick = () => {
    navigaiton.back()
  }

  return (
    <div style={{...styles}}>
      <h1>Yellow</h1>
      <p onClick={handleClick}>back</p>
      <Link to="/black">/black</Link>
    </div>
  )
}