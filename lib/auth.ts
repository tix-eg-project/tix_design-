export interface DemoUser {
  name: string
  email: string
  password: string
}

export const DEMO_USER: DemoUser = {
  name: 'أحمد محمد',
  email: 'demo@tix-eg.com',
  password: 'demo1234',
}

export interface LoggedInUser {
  name: string
  email: string
}

export const setAuthToken = (user: LoggedInUser) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('tix_user', JSON.stringify(user))
  }
}

export const getAuthToken = (): LoggedInUser | null => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('tix_user')
    return token ? JSON.parse(token) : null
  }
  return null
}

export const clearAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('tix_user')
  }
}

export const validateLogin = (email: string, password: string): boolean => {
  return email === DEMO_USER.email && password === DEMO_USER.password
}
