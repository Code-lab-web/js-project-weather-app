import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import { AlertProvider } from './AlertContext'
import AlertPopup from './AlertPopup'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AlertProvider>
      <App />
      <AlertPopup />
    </AlertProvider>
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register('/sw.js')
  })
}
