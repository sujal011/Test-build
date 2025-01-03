'use client'

import { validateHeaderName } from "http"

// import React, { createContext, useContext, useState, useEffect } from 'react'

// type User = {
//   email: string
// } | null

// type AuthContextType = {
//   user: User
//   login: (email: string) => void
//   logout: () => void
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User>(null)

//   useEffect(() => {
//     // Check if user is logged in (e.g., by checking localStorage or a token)
//     const storedUser = localStorage.getItem('user')
//     if (storedUser) {
//       setUser(JSON.parse(storedUser))
//     }
//   }, [])

//   const login = (email: string) => {
//     const newUser = { email }
//     setUser(newUser)
//     localStorage.setItem('user', JSON.stringify(newUser))
//   }

//   const logout = () => {
//     setUser(null)
//     localStorage.removeItem('user')
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider')
//   }
//   return context
// }

ye firebase vala