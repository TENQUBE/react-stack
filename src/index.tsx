import React from 'react'
import ReactDOM from 'react-dom/client'

const App = () => (
  <p>hello world</p>
)

const container = document.getElementById('wrap') as HTMLElement
const root = ReactDOM.createRoot(container)

root.render(<App />)