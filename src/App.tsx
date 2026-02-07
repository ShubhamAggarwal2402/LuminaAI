import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginScreen from './components/LoginScreen'
import SignupScreen from './components/SignupScreen'
import Dashboard from './components/Dashboard'
import ModuleDetailScreen from './components/ModuleDetailScreen'
import ProtectedRoute from './components/ProtectedRoute'
import { isAuthenticated } from './auth'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginScreen />
            )
          }
        />
        <Route path="/signup" element={<SignupScreen />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/module/:moduleId"
          element={
            <ProtectedRoute>
              <ModuleDetailScreen />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
