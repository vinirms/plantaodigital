import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import GlobalStyles from './GlobalStyles.js'
import Landing from './pages/Landing/Landing.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyles/>
    <App />
    {/* <Landing/>  */}
  </StrictMode>,
)
