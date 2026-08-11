import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { CMSProvider } from './context/CMSContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <CMSProvider>
        <App />
      </CMSProvider>
    </HashRouter>
  </StrictMode>,
)
