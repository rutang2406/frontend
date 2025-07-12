import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './DialogContent'
import { Button } from './Button'
import { Input } from './Input'
import { Label } from './Label'
import { Eye, EyeOff, UserCheck, Lock, Mail } from 'lucide-react'

const LoginModal = ({ isOpen, onClose, onSignUpClick }) => {
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
      // Add your login logic here
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      console.log('Login attempt:', { email, password })
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
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
            New to our platform? {' '}
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