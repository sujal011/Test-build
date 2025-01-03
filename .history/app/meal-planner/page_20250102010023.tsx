'use client'

import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function MealPlannerPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [preferences, setPreferences] = useState({
    calories: '',
    diet: '',
    excludeIngredients: '',
    mealCount: 3
  })

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }
  }, [user, router])

  const dietOptions = [
    'balanced',
    'high-protein',
    'low-carb',
    'low-fat',
    'vegan',
    'vegetarian'
  ]

  const fetchMealPlan = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const APP_ID = process.env.NEXT_PUBLIC_EDAMAM_APP_ID
      const APP_KEY = process.env.NEXT_PUBLIC_EDAMAM_APP_KEY
      const USER_ID = process.env.NEXT_PUBLIC_EDAMAM_USER_ID // Add this to your env variables
      
      if (!APP_ID || !APP_KEY || !USER_ID) {
        throw new Error('Missing API configuration. Please check your environment variables.')
      }

      // Input validation
      if (preferences.calories && (isNaN(preferences.calories) || preferences.calories < 0)) {
        throw new Error('Please enter a valid calorie amount')
      }

      // Build query parameters
      const params = new URLSearchParams({
        type: 'public',
        app_id: APP_ID,
        app_key: APP_KEY,
        random: 'true'
      })

      if (preferences.diet) params.append('diet', preferences.diet)
      if (preferences.calories) params.append('calories', preferences.calories)
      if (preferences.excludeIngredients) {
        preferences.excludeIngredients.split(',').forEach(ingredient => 
          params.append('excluded', ingredient.trim())
        )
      }

      const fetchCount = Math.min(100, Math.max(20, preferences.mealCount * 2))
      params.append('to', fetchCount.toString())
      
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?${params.toString()}`,
        { 
          cache: 'no-store',
          headers: {
            'Accept': 'application/json',
            'Edamam-Account-User': USER_ID  // Add the required user ID header
          }
        }
      )
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `API Error: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (!data.hits || data.hits.length === 0) {
        throw new Error('No recipes found matching your criteria. Try adjusting your preferences.')
      }

      const randomMeals = data.hits
        .sort(() => 0.5 - Math.random())
        .slice(0, preferences.mealCount)
        .map(hit => ({
          id: hit.recipe.uri.split('#')[1],
          name: hit.recipe.label,
          image: hit.recipe.image,
          calories: Math.round(hit.recipe.calories / hit.recipe.yield),
          totalCalories: Math.round(hit.recipe.calories),
          servings: hit.recipe.yield,
          ingredients: hit.recipe.ingredientLines,
          url: hit.recipe.url,
          dietLabels: hit.recipe.dietLabels,
          healthLabels: hit.recipe.healthLabels
        }))
      
      setMeals(randomMeals)
    } catch (err) {
      setError(err.message || 'Failed to generate meal plan. Please try again.')
      console.error('Meal plan error:', err)
    } finally {
      setLoading(false)
    }
  }

      const randomMeals = data.hits
        .sort(() => 0.5 - Math.random())
        .slice(0, preferences.mealCount)
        .map(hit => ({
          id: hit.recipe.uri.split('#')[1],
          name: hit.recipe.label,
          image: hit.recipe.image,
          calories: Math.round(hit.recipe.calories / hit.recipe.yield), // Per serving
          totalCalories: Math.round(hit.recipe.calories),
          servings: hit.recipe.yield,
          ingredients: hit.recipe.ingredientLines,
          url: hit.recipe.url,
          dietLabels: hit.recipe.dietLabels,
          healthLabels: hit.recipe.healthLabels
        }))
      
      setMeals(randomMeals)
    } catch (err) {
      setError(err.message || 'Failed to generate meal plan. Please try again.')
      console.error('Meal plan error:', err)
    } finally {
      setLoading(false)
    }
  }

  const MealCard = ({ meal }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-48 object-cover"
        />
        {meal.dietLabels.length > 0 && (
          <div className="absolute top-2 right-2">
            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
              {meal.dietLabels[0]}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{meal.name}</h3>
        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <span>{meal.calories} cal/serving</span>
          <span>{meal.servings} servings</span>
        </div>
        <div className="mb-4">
          <h4 className="font-medium mb-2">Ingredients:</h4>
          <ul className="text-sm text-gray-600 list-disc pl-4 max-h-40 overflow-y-auto">
            {meal.ingredients.map((ingredient, idx) => (
              <li key={idx} className="mb-1">{ingredient}</li>
            ))}
          </ul>
        </div>
        <a
          href={meal.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-green-100 text-green-700 py-2 rounded-md hover:bg-green-200 transition-colors"
        >
          View Recipe
        </a>
      </div>
    </div>
  )

  if (!user) return null

  return (
    <div className="min-h-screen bg-cooking">
      <Navbar />
      <div className="min-h-screen bg-black/50 p-4 md:p-8 pt-24">
        <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-8 text-center">
            Meal Planner
          </h1>
          
          <form onSubmit={fetchMealPlan} className="space-y-6 mb-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Calories (per meal)
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={preferences.calories}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    calories: e.target.value
                  }))}
                  placeholder="e.g., 500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diet Type
                </label>
                <select
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={preferences.diet}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    diet: e.target.value
                  }))}
                >
                  <option value="">Any</option>
                  {dietOptions.map(diet => (
                    <option key={diet} value={diet}>
                      {diet.charAt(0).toUpperCase() + diet.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exclude Ingredients
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={preferences.excludeIngredients}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    excludeIngredients: e.target.value
                  }))}
                  placeholder="e.g., nuts, shellfish (comma-separated)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Meals
                </label>
                <select
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={preferences.mealCount}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    mealCount: parseInt(e.target.value)
                  }))}
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400 text-lg font-medium"
            >
              {loading ? 'Generating...' : 'Generate Meal Plan'}
            </button>
          </form>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {meals.map(meal => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}