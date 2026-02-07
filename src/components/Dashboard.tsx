import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getStoredUser, logout } from '../auth'
import './Dashboard.css'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { id: 'courses', label: 'My Courses', icon: 'courses' },
  { id: 'achievements', label: 'Achievements', icon: 'trophy' },
  { id: 'settings', label: 'Settings', icon: 'gear' },
] as const

const TREND_POINTS = [40, 55, 45, 65, 58, 72] // Jan–Jun approximate values for SVG
const COURSES = [
  { id: '1', title: 'Advanced Python', difficulty: 'INTERMEDIATE', difficultyClass: 'orange', description: 'Master decorators, generators, and async programming.', duration: '12h 45m', image: 'python' },
  { id: '2', title: 'UI/UX Design', difficulty: 'BEGINNER', difficultyClass: 'green', description: 'Learn design principles and Figma from scratch.', duration: '8h 20m', image: 'design' },
  { id: '3', title: 'Data Science Fundamentals', difficulty: 'INTERMEDIATE', difficultyClass: 'orange', description: 'Statistics, Python, and visualization basics.', duration: '15h 10m', image: 'data' },
  { id: '4', title: 'Machine Learning Ops', difficulty: 'EXPERT', difficultyClass: 'red', description: 'Deploy and monitor ML models in production.', duration: '22h 30m', image: 'ml' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(getStoredUser())
  const [activeNav, setActiveNav] = useState('dashboard')

  useEffect(() => {
    if (!user) {
      navigate('/', { replace: true })
      return
    }
  }, [user, navigate])

  const handleLogout = () => {
    logout()
    setUser(null)
    navigate('/', { replace: true })
  }

  const handleNav = (id: string) => {
    if (id === 'settings') {
      handleLogout()
      return
    }
    setActiveNav(id)
  }

  if (!user) return null

  const minY = Math.min(...TREND_POINTS)
  const maxY = Math.max(...TREND_POINTS)
  const range = maxY - minY || 1
  const width = 280
  const height = 120
  const padding = { top: 8, right: 8, bottom: 24, left: 8 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom
  const points = TREND_POINTS.map((v, i) => {
    const x = padding.left + (i / (TREND_POINTS.length - 1)) * chartWidth
    const y = padding.top + chartHeight - ((v - minY) / range) * chartHeight
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="student-dashboard">
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-profile">
          <div className="dashboard-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
              <path d="M9 14h6v4H9z" />
            </svg>
          </div>
          <div className="dashboard-profile-info">
            <span className="dashboard-profile-name">{user.name}</span>
            <span className="dashboard-profile-badge">Premium Learner</span>
          </div>
        </div>

        <nav className="dashboard-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`dashboard-nav-item ${activeNav === item.id ? 'dashboard-nav-item--active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              {item.icon === 'grid' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              )}
              {item.icon === 'courses' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  <path d="M8 7h8" />
                  <path d="M8 11h8" />
                </svg>
              )}
              {item.icon === 'trophy' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47 1-1.05 1H7.05C6.47 18 6 17.55 6 17v-2.34" />
                  <path d="M14 14.66V17c0 .55.47 1 1.05 1h1.9c.58 0 1.05-.45 1.05-1v-2.34" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              )}
              {item.icon === 'gear' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              )}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="dashboard-tutor-cta">
          <h3 className="dashboard-tutor-cta-title">STUCK ON A TOPIC?</h3>
          <p className="dashboard-tutor-cta-desc">Get instant answers from your personal AI tutor.</p>
          <button type="button" className="dashboard-btn-tutor">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5a3 3 0 1 0-5.998.235 4 4 0 0 1 2.103 3.415A3 3 0 0 0 9 14a3 3 0 0 0 3-3" />
              <path d="M12 19v-4" />
              <path d="M12 15h.01" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            AI Tutor Help
          </button>
        </div>
      </aside>

      <div className="dashboard-body">
        <header className="dashboard-page-header">
          <h1 className="dashboard-page-title">Student Learning Dashboard</h1>
        </header>

        <main className="dashboard-main">
          <div className="dashboard-welcome-row">
            <div className="dashboard-welcome-text">
              <h2>Welcome back, {user.name.split(' ')[0]}! 👋</h2>
              <p>You&apos;ve mastered <strong>3 new skills</strong> this week. Keep up the momentum!</p>
            </div>
            <div className="dashboard-streak-badge">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 23c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2zm6-4v-2c0-1.5-.8-2.8-2-3.5V13c0-2.8-2.2-5-5-5s-5 2.2-5 5v.5C4.8 19.2 4 20.5 4 22v2h16z" />
              </svg>
              <span>STREAK 12 Days</span>
            </div>
          </div>

          <div className="dashboard-cards-row">
            <div className="dashboard-card dashboard-card--trend">
              <div className="dashboard-card-trend-header">
                <div>
                  <h3>Knowledge Trend</h3>
                  <p>Weekly score improvement over 6 months</p>
                </div>
                <div className="dashboard-card-trend-stats">
                  <span className="dashboard-trend-value">84%</span>
                  <span className="dashboard-trend-delta">+12%</span>
                </div>
              </div>
              <div className="dashboard-trend-chart">
                <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                  <polyline
                    fill="none"
                    stroke="#3366ff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                </svg>
              </div>
              <div className="dashboard-trend-labels">
                <span>JAN</span>
                <span>FEB</span>
                <span>MAR</span>
                <span>APR</span>
                <span>MAY</span>
                <span>JUN</span>
              </div>
            </div>

            <div className="dashboard-card dashboard-card--continue">
              <h3>Continue Learning</h3>
              <p className="dashboard-continue-course">Advanced Python</p>
              <p className="dashboard-continue-next">Next: Decorators and Generators deep dive.</p>
              <div className="dashboard-continue-progress">
                <span>Module 4 of 12</span>
                <div className="dashboard-progress-bar">
                  <div className="dashboard-progress-fill" style={{ width: '65%' }} />
                </div>
              </div>
              <button type="button" className="dashboard-btn-resume">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Resume Course
              </button>
            </div>
          </div>

          <section className="dashboard-courses">
            <div className="dashboard-courses-header">
              <h3>Available Courses</h3>
              <button type="button" className="dashboard-link">View All Library</button>
            </div>
            <div className="dashboard-courses-grid">
              {COURSES.map((course) => (
                <div key={course.id} className="dashboard-course-card">
                  <span className={`dashboard-course-difficulty dashboard-course-difficulty--${course.difficultyClass}`}>
                    {course.difficulty}
                  </span>
                  <div className={`dashboard-course-image dashboard-course-image--${course.image}`} />
                  <h4>{course.title}</h4>
                  <p>{course.description}</p>
                  <div className="dashboard-course-meta">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    <span>{course.duration}</span>
                  </div>
                  <button type="button" className="dashboard-btn-start">Start</button>
                </div>
              ))}
            </div>
          </section>
        </main>

        <div className="dashboard-float-help">
          <span>Need help?</span>
          <button type="button" className="dashboard-float-btn" aria-label="AI help">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5a3 3 0 1 0-5.998.235 4 4 0 0 1 2.103 3.415A3 3 0 0 0 9 14a3 3 0 0 0 3-3" />
              <path d="M12 19v-4" />
              <path d="M12 15h.01" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
