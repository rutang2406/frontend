import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QAProvider } from './context/QAContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AskQuestionPage from './pages/AskQuestionPage'
import QuestionDetailPage from './pages/QuestionDetailPage'
import ViewQuestionPage from './context/ViewQuestionPage.jsx'

function App() {
  return (
    <QAProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/ask" element={<AskQuestionPage />} />
              <Route path="/question/:id" element={<QuestionDetailPage />} />
              <Route path="/home" element={<ViewQuestionPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QAProvider>
  )
}

export default App
