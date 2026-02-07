import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../auth'
import './SignupScreen.css'

const LEARNING_GOALS = [
  { value: '', label: 'Select your goal' },
  { value: 'career-switch', label: 'Career switch' },
  { value: 'upskill', label: 'Upskill in current role' },
  { value: 'personal', label: 'Personal interest' },
  { value: 'academic', label: 'Academic / exams' },
  { value: 'other', label: 'Other' },
]

export type SignupFormData = {
  fullName: string
  email: string
  password: string
  learningGoal: string
}

type FormErrors = Partial<Record<keyof SignupFormData, string>>

function validateForm(data: SignupFormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.fullName.trim()) errors.fullName = 'Full name is required'
  if (!data.email.trim()) errors.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Please enter a valid email'
  if (!data.password) errors.password = 'Password is required'
  else if (data.password.length < 8) errors.password = 'Password must be at least 8 characters'
  if (!data.learningGoal) errors.learningGoal = 'Please select a learning goal'
  return errors
}

export default function SignupScreen() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [learningGoal, setLearningGoal] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setApiError('')
    const data: SignupFormData = { fullName, email, password, learningGoal }
    const nextErrors = validateForm(data)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setLoading(true)
    try {
      await register(email, password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = () => {
    // TODO: OAuth with Google
  }

  const handleGitHub = () => {
    // TODO: OAuth with GitHub
  }

  return (
    <div className="signup-screen">
      <div className="signup-left">
        <div className="signup-left-dots" aria-hidden />
        <div className="signup-left-content">
          <div className="signup-brand">
            <span className="signup-brand-stars" aria-hidden>
              <svg viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 2l3.5 7 7.5 1-5.5 5.5 1.5 7.5L16 18l-6.5 4 1.5-7.5L6 10l7.5-1L16 2z" />
              </svg>
            </span>
            <span className="signup-brand-text">LuminaAI</span>
          </div>
          <h2 className="signup-hero-title">Master any skill with your personal AI mentor.</h2>
          <ul className="signup-features">
            <li className="signup-feature">
              <span className="signup-feature-icon" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </span>
              <div>
                <strong>AI-personalized curriculum</strong>
                <p>Paths that adapt to your pace and prior knowledge instantly.</p>
              </div>
            </li>
            <li className="signup-feature">
              <span className="signup-feature-icon" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <div>
                <strong>Real-time doubt clearing</strong>
                <p>24/7 access to an AI tutor that explains complex concepts simply.</p>
              </div>
            </li>
            <li className="signup-feature">
              <span className="signup-feature-icon" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </span>
              <div>
                <strong>Knowledge Trend Tracking</strong>
                <p>Visualize your growth with data-driven performance analytics.</p>
              </div>
            </li>
          </ul>
          <div className="signup-social-proof">
            <div className="signup-avatars">
              <span className="signup-avatar" />
              <span className="signup-avatar" />
              <span className="signup-avatar" />
            </div>
            <span className="signup-badge">+2k</span>
            <span className="signup-proof-text">Joined by 50,000+ active learners worldwide.</span>
          </div>
        </div>
      </div>

      <div className="signup-right">
        <div className="signup-form-wrap">
          <h1 className="signup-title">Create Account</h1>
          <p className="signup-subtitle">Join the future of personalized learning.</p>

          {apiError && (
            <div className="signup-error-banner" role="alert">
              {apiError}
            </div>
          )}
          <form onSubmit={handleSubmit} className="signup-form" noValidate>
                <label className="signup-label">
                  Full Name
                  <div className={`signup-input-wrap ${errors.fullName ? 'signup-input-wrap--error' : ''}`}>
                    <span className="signup-input-icon" aria-hidden>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Alex Rivera"
                      value={fullName}
                      onChange={(e) => { setFullName(e.target.value); setErrors((e) => ({ ...e, fullName: undefined })) }}
                      className="signup-input"
                      autoComplete="name"
                    />
                  </div>
                  {errors.fullName && <span className="signup-error">{errors.fullName}</span>}
                </label>
                <label className="signup-label">
                  Email Address
                  <div className={`signup-input-wrap ${errors.email ? 'signup-input-wrap--error' : ''}`}>
                    <span className="signup-input-icon" aria-hidden>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      placeholder="alex@example.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrors((e) => ({ ...e, email: undefined })) }}
                      className="signup-input"
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && <span className="signup-error">{errors.email}</span>}
                </label>
                <label className="signup-label">
                  Password
                  <div className={`signup-input-wrap ${errors.password ? 'signup-input-wrap--error' : ''}`}>
                    <span className="signup-input-icon" aria-hidden>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </span>
                    <input
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setErrors((e) => ({ ...e, password: undefined })) }}
                      className="signup-input"
                      autoComplete="new-password"
                    />
                  </div>
                  {errors.password && <span className="signup-error">{errors.password}</span>}
                </label>
                <label className="signup-label">
                  Learning Goal
                  <div className={`signup-input-wrap signup-select-wrap ${errors.learningGoal ? 'signup-input-wrap--error' : ''}`}>
                    <span className="signup-input-icon" aria-hidden>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </span>
                    <select
                      value={learningGoal}
                      onChange={(e) => { setLearningGoal(e.target.value); setErrors((e) => ({ ...e, learningGoal: undefined })) }}
                      className="signup-select"
                      aria-invalid={!!errors.learningGoal}
                    >
                      {LEARNING_GOALS.map((opt) => (
                        <option key={opt.value || 'placeholder'} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <span className="signup-chevron" aria-hidden>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                    </span>
                  </div>
                  {errors.learningGoal && <span className="signup-error">{errors.learningGoal}</span>}
                </label>
                <button type="submit" className="signup-btn-primary" disabled={loading}>
                  {loading ? 'Creating account…' : 'Create Account'}
                  <span className="signup-btn-arrow" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </span>
                </button>
              </form>

              <div className="signup-divider">
                <span>OR CONTINUE WITH</span>
              </div>
              <div className="signup-social-buttons">
                <button type="button" className="signup-btn-social" onClick={handleGoogle}>
                  <svg className="signup-google-icon" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button type="button" className="signup-btn-social" onClick={handleGitHub}>
                  <svg className="signup-github-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </button>
              </div>

              <p className="signup-login">
                Already have an account? <Link to="/" className="signup-link">Log in</Link>
              </p>
        </div>
      </div>
    </div>
  )
}
