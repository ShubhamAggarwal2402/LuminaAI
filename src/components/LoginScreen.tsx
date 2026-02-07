import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../auth'
import './LoginScreen.css'

export default function LoginScreen() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const user = login(email, password)
    if (user) {
      navigate('/dashboard', { replace: true })
    } else {
      setError('Invalid email or password. Please try again.')
    }
  }

  return (
    <div className="login-screen">
      <div className="login-left">
        <div className="login-left-dots" aria-hidden />
        <div className="login-left-content">
          <div className="login-hero-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8V4H8" />
              <rect width="16" height="12" x="4" y="8" rx="2" />
              <path d="M2 14h2" />
              <path d="M20 14h2" />
              <path d="M15 13v2" />
              <path d="M9 13v2" />
            </svg>
          </div>
          <h2 className="login-hero-title">
            Master New Skills with AI<br />Intelligence
          </h2>
          <p className="login-hero-desc">
            Join thousands of students using our AI-powered platform to accelerate their career in technology and design.
          </p>
          <div className="login-hero-placeholder">
            <svg viewBox="0 0 400 200" fill="none" className="login-hero-graphic">
              <path d="M0 120 Q100 80 200 100 T400 80 L400 200 L0 200 Z" fill="url(#heroGrad)" opacity="0.4" />
              <path d="M0 140 Q80 100 180 120 T380 100 L380 200 L0 200 Z" fill="url(#heroGrad)" opacity="0.25" />
              <defs>
                <linearGradient id="heroGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="white" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-wrap">
          <div className="login-brand">
            <span className="login-brand-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                <path d="M8 7h8" />
                <path d="M8 11h8" />
              </svg>
            </span>
            <span className="login-brand-text">LuminaAI</span>
          </div>
          <h1 className="login-welcome">Welcome back!</h1>
          <p className="login-subtitle">Please enter your details to sign in.</p>
          <p className="login-demo-hint">Demo: alex@example.com / lumina2024</p>

          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <label className="login-label">
              Email Address
              <div className="login-input-wrap">
                <span className="login-input-icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-input"
                  autoComplete="email"
                />
              </div>
            </label>
            <label className="login-label">
              <span className="login-label-row">
                Password
                <a href="#" className="login-link">Forgot password?</a>
              </span>
              <div className="login-input-wrap">
                <span className="login-input-icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input"
                  autoComplete="current-password"
                />
              </div>
            </label>
            <label className="login-checkbox-wrap">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="login-checkbox"
              />
              <span className="login-checkbox-label">Remember for 30 days</span>
            </label>
            <button type="submit" className="login-btn-primary">Sign In</button>
          </form>

          <div className="login-divider">
            <span>Or continue with</span>
          </div>
          <button type="button" className="login-btn-google">
            <svg className="login-google-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>

          <p className="login-signup">
            Don&apos;t have an account? <Link to="/signup" className="login-link">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
