import { Navigate, useLocation } from 'react-router-dom'
import { isAuthenticated } from '../auth'

type Props = {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const location = useLocation()
  if (!isAuthenticated()) {
    return <Navigate to="/" state={{ from: location }} replace />
  }
  return <>{children}</>
}
