import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/UserContext'
import { QAProvider } from './context/QAContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <QAProvider>
        <App />
      </QAProvider>
    </UserProvider>
  </React.StrictMode>
)
