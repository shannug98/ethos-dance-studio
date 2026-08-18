import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import EthosGalleryPage from './EthosGalleryPage.jsx'

const isGalleryPage = window.location.pathname.includes('gallery') || window.location.hash.includes('gallery-page');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isGalleryPage ? <EthosGalleryPage /> : <App />}
  </StrictMode>,
)
