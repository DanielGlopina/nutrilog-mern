import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Browser entry point. Application-wide providers and routing are configured in App.
createRoot(document.getElementById('root')!).render(
  <App />
)
