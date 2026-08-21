import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import EventsPage from './pages/EventsPage.jsx'
import EventDetailsPage from './pages/EventDetailsPage.jsx'
import EthosGalleryPage from './EthosGalleryPage.jsx'
import SangeetPage from './pages/SangeetPage.jsx'
import PackagesPage from './pages/PackagesPage.jsx'
import LocationPage from './pages/LocationPage.jsx'
import StudentPortalPage from './pages/StudentPortalPage.jsx'
import AdminPortalPage from './pages/AdminPortalPage.jsx'

const pathname = window.location.pathname.toLowerCase();
const hash = window.location.hash.toLowerCase();
const search = window.location.search.toLowerCase();

let ComponentToRender = App;

if (search.includes('event=') || search.includes('id=') || pathname.includes('detail')) {
  ComponentToRender = EventDetailsPage;
} else if (pathname.includes('events') || hash.includes('events')) {
  ComponentToRender = EventsPage;
} else if (pathname.includes('gallery') || hash.includes('gallery')) {
  ComponentToRender = EthosGalleryPage;
} else if (pathname.includes('sangeet') || hash.includes('sangeet')) {
  ComponentToRender = SangeetPage;
} else if (pathname.includes('packages') || hash.includes('packages')) {
  ComponentToRender = PackagesPage;
} else if (pathname.includes('location') || hash.includes('location')) {
  ComponentToRender = LocationPage;
} else if (pathname.includes('student') || hash.includes('student')) {
  ComponentToRender = StudentPortalPage;
} else if (pathname.includes('admin') || hash.includes('admin')) {
  ComponentToRender = AdminPortalPage;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ComponentToRender />
  </StrictMode>,
)
