import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from "@clerk/clerk-react";
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')).render(
  <StrictMode>
<<<<<<< HEAD
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </StrictMode>,
=======
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
>>>>>>> bfbdd51c13b469fdc2a8eb298d55bbdbfea18fd0
)
