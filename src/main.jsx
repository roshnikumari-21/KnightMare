import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './contexts/commoncontext.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google'
import ProfileProvider from './contexts/profileContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ContextProvider>
    <ProfileProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
    </ProfileProvider>
  </ContextProvider>
  </BrowserRouter>,
)
