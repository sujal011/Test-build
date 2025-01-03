'use client'

import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-around items-center p-4 bg-black/80 backdrop-blur-sm">
      <Link 
        href="/" 
        className="text-white font-bold text-lg px-5 py-2 rounded-md hover:bg-green-400 hover:text-black transition-colors"
      >
        Home
      </Link>
      <Link 
        href="/recipe-generator" 
        className="text-white font-bold text-lg px-5 py-2 rounded-md hover:bg-green-400 hover:text-black transition-colors"
      >
        Recipe Generator
      </Link>
      <Link 
        href="/meal-planner" 
        className="text-white font-bold text-lg px-5 py-2 rounded-md hover:bg-green-400 hover:text-black transition-colors"
      >
        Meal Planner
      </Link>
      {user && (
        <button
          onClick={handleLogout}
          className="text-white font-bold text-lg px-5 py-2 rounded-md hover:bg-green-400 hover:text-black transition-colors"
        >
          Logout
        </button>
      )}
    </nav>
  )
}

