import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import EventsPage from './pages/EventsPage.jsx'
import SchedulePage from './pages/SchedulePage.jsx'
import EthosGalleryPage from './EthosGalleryPage.jsx'
import SangeetPage from './pages/SangeetPage.jsx'
import PackagesPage from './pages/PackagesPage.jsx'
import LocationPage from './pages/LocationPage.jsx'

const pathname = window.location.pathname.toLowerCase();
const hash = window.location.hash.toLowerCase();

let ComponentToRender = App;

if (pathname.includes('events') || hash.includes('events')) {
  ComponentToRender = EventsPage;
} else if (pathname.includes('schedule') || hash.includes('schedule')) {
  ComponentToRender = SchedulePage;
} else if (pathname.includes('gallery') || hash.includes('gallery')) {
  ComponentToRender = EthosGalleryPage;
} else if (pathname.includes('sangeet') || hash.includes('sangeet')) {
  ComponentToRender = SangeetPage;
} else if (pathname.includes('packages') || hash.includes('packages')) {
  ComponentToRender = PackagesPage;
} else if (pathname.includes('location') || hash.includes('location')) {
  ComponentToRender = LocationPage;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ComponentToRender />
  </StrictMode>,
)
