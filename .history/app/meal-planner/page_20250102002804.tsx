'use client'

import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'

export default function MealPlannerPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }
  }, [user, router])

  if (!user) {
    return null // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-cooking">
      <Navbar />
      <div className="min-h-screen bg-black/50 p-8 pt-24"> {/* Added pt-24 for navbar space */}
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
            Meal Planner
          </h1>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 text-center mb-8">
              Plan your weekly meals with our intelligent meal planning system. Get personalized recommendations and nutritional insights.
            </p>
            {/* Meal planner functionality will be added here */}
            <div className="text-center text-gray-500">
              Coming soon...
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


