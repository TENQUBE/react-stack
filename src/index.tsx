import React from 'react'
import ReactDOM from 'react-dom/client'

import HybridStackProvider, { AnimationType, HybridRoute } from '../dist/esm/'

const App = () => (
  <p>hello world</p>
)

const container = document.getElementById('wrap') as HTMLElement
const root = ReactDOM.createRoot(container)

root.render(
  <HybridStackProvider>
    <HybridRoute route="/" component={<App />} animation={AnimationType.None} />
  </HybridStackProvider>
)