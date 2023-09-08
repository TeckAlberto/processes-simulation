import React from 'react'
import ReactDOM from 'react-dom/client'
import { SimulationProvider } from './context/SimulationProvider.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SimulationProvider>
      <App />
    </SimulationProvider>
  </React.StrictMode>,
)
