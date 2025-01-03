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
      // Replace with your Edamam API credentials
      const APP_ID = 'fe4fb275'
      const APP_KEY = '
0a6c1ff2c5ea867b6065e09f30ba952d'
      
      const excludeQuery = preferences.excludeIngredients
        ? `&excluded=${preferences.excludeIngredients.split(',').join('&excluded=')}`
        : ''
      
      const dietQuery = preferences.diet ? `&diet=${preferences.diet}` : ''
      const caloriesQuery = preferences.calories ? `&calories=${preferences.calories}` : ''
      
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}${dietQuery}${caloriesQuery}${excludeQuery}&random=true`,
        { cache: 'no-store' }
      )
      
      if (!response.ok) throw new Error('Failed to fetch recipes')
      
      const data = await response.json()
      const randomMeals = data.hits
        .sort(() => 0.5 - Math.random())
        .slice(0, preferences.mealCount)
        .map(hit => ({
          id: hit.recipe.uri.split('#')[1],
          name: hit.recipe.label,
          image: hit.recipe.image,
          calories: Math.round(hit.recipe.calories),
          servings: hit.recipe.yield,
          ingredients: hit.recipe.ingredientLines,
          url: hit.recipe.url
        }))
      
      setMeals(randomMeals)
    } catch (err) {
      setError('Failed to generate meal plan. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-cooking">
      <Navbar />
      <div className="min-h-screen bg-black/50 p-8 pt-24">
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
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
                  className="w-full p-2 border rounded-md"
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
                  className="w-full p-2 border rounded-md"
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
                  className="w-full p-2 border rounded-md"
                  value={preferences.excludeIngredients}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    excludeIngredients: e.target.value
                  }))}
                  placeholder="e.g., nuts,shellfish (comma-separated)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Meals
                </label>
                <select
                  className="w-full p-2 border rounded-md"
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
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400"
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
              <div key={meal.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{meal.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {meal.calories} calories | {meal.servings} servings
                  </p>
                  <div className="mb-4">
                    <h4 className="font-medium mb-1">Ingredients:</h4>
                    <ul className="text-sm text-gray-600 list-disc pl-4">
                      {meal.ingredients.map((ingredient, idx) => (
                        <li key={idx}>{ingredient}</li>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}