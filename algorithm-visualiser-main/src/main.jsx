import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { ParamsProvider } from './context/context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ParamsProvider>
      <App />
    </ParamsProvider>
    
  </React.StrictMode>,
)
