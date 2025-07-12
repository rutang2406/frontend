import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, MessageSquare } from 'lucide-react'
import { useQA } from '../context/QAContext'
import NotificationDropdown from './NotificationDropdown'

const Navbar = () => {
  const { unreadNotificationsCount } = useQA()
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Q&A Forum</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/ask"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ask Question
            </Link>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Bell className="h-6 w-6" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <NotificationDropdown onClose={() => setShowNotifications(false)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
