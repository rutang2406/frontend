// LoginModalDemo.jsx
import React, { useState } from 'react'
import { Eye, EyeOff, UserCheck, Lock, Mail, X } from 'lucide-react'

// Dialog components
function Dialog({ open, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
function DialogContent({ className = '', children }) {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 w-1/2 sm:max-w-md w-full mx-4 relative ${className}`}>
      {children}
    </div>
  )
}
function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>
}
function DialogTitle({ className = '', children }) {
  return <h2 className={`font-semibold ${className}`}>{children}</h2>
}

// Form components
function Button({ className = '', ...props }) {
  return (
    <button
      {...props}
      className={`rounded px-4 py-2 font-semibold transition-colors disabled:opacity-60 ${className}`}
    />
  )
}
function Input(props) {
  return (
    <input
      {...props}
      className={`border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${props.className || ''}`}
    />
  )
}
function Label({ className = '', ...props }) {
  return (
    <label {...props} className={`block text-sm font-medium ${className}`} />
  )
}

// LoginModal
function LoginModal({ isOpen, onClose, onSignUpClick }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      onClose()
      setEmail('')
      setPassword('')
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  const handleSignUpClick = (e) => {
    e.preventDefault()
    onClose()
    onSignUpClick()
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        {/* Close Icon */}
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <DialogHeader>
          <DialogTitle className="text-center text-xl flex items-center justify-center gap-2">
            <UserCheck className="h-6 w-6 text-blue-600" />
            <span>Welcome Back</span>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-blue-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
          <p className="text-sm text-gray-600 text-center">
            New to our platform?{' '}
            <button
              type="button"
              onClick={handleSignUpClick}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign up now
            </button>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}



export default LoginModal
