import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './contexts/commoncontext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ProfileProvider from './contexts/profileContext.jsx'
import GameProvider from './contexts/gamecontext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ContextProvider>
    <ProfileProvider>
    <GameProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
    </GameProvider>
    </ProfileProvider>
  </ContextProvider>
  </BrowserRouter>
)
