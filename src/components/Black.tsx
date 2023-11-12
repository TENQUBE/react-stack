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
      <p onClick={async () => {
        // navigation.push('/', { clear: true })
        // navigation.back(2)
        await navigation.back()
        await navigation.replace('/red')
        await navigation.push('/blue')
        // navigation.back()
        // navigation.push('/red')
        // navigation.push('/blue')
      }}>/white - clear</p>
      <br />
      <Link to="/red?test=test">/red?test=test</Link>
    </div>
  )
}