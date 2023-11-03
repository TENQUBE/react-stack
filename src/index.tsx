import React from 'react'
import ReactDOM from 'react-dom/client'
import Route from './Route'

const container = document.getElementById('wrap') as HTMLElement
const root = ReactDOM.createRoot(container)

root.render(
  <Route />
)