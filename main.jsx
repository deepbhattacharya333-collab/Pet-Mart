// main.jsx — This is the entry point of the entire React app
// React starts from here and puts everything inside index.html's <div id="root">

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Find the <div id="root"> in index.html and inject the React app inside it
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
