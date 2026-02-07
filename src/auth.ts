/**
 * Simple in-app auth with a sample user.
 * Replace with real API (e.g. Firebase, Auth0, your backend) later.
 */

const STORAGE_KEY = 'luminaai_user'

export type User = {
  email: string
  name: string
}

/** Sample user that can log in through the app */
export const SAMPLE_USER = {
  email: 'alex@example.com',
  password: 'lumina2026',
  name: 'Alex Rivera',
} as const

export function login(email: string, password: string): User | null {
  const normalizedEmail = email.trim().toLowerCase()
  if (
    normalizedEmail === SAMPLE_USER.email.toLowerCase() &&
    password === SAMPLE_USER.password
  ) {
    const user: User = { email: SAMPLE_USER.email, name: SAMPLE_USER.name }
    persistUser(user)
    return user
  }
  return null
}

export function logout(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

export function getStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as unknown
    if (data && typeof data === 'object' && 'email' in data && 'name' in data) {
      return { email: String(data.email), name: String(data.name) }
    }
  } catch {
    // ignore
  }
  return null
}

function persistUser(user: User): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } catch {
    // ignore
  }
}

export function isAuthenticated(): boolean {
  return getStoredUser() != null
}
