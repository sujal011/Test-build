// 'use client'

// import { useAuth } from '../contexts/AuthContext'
// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import Navbar from '../components/Navbar'
// import { Alert, AlertDescription } from '@/components/ui/alert'

// interface Meal {
//   id: number
//   title: string
//   image: string
//   calories: number
//   servings: number
//   ingredients: string[]
//   sourceUrl: string
//   diets: string[]
// }

// interface MealCardProps {
//   meal: Meal
// }

// const MealCard = ({ meal }: MealCardProps) => (
//   <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//     <div className="relative">
//       <img
//         src={meal.image}
//         alt={meal.title}
//         className="w-full h-48 object-cover"
//       />
//       {meal.diets.length > 0 && (
//         <div className="absolute top-2 right-2">
//           <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
//             {meal.diets[0]}
//           </span>
//         </div>
//       )}
//     </div>
//     <div className="p-4">
//       <h3 className="font-semibold text-lg mb-2 line-clamp-2">{meal.title}</h3>
//       <div className="flex justify-between text-sm text-gray-600 mb-3">
//         <span>{Math.round(meal.calories)} cal/serving</span>
//         <span>{meal.servings} servings</span>
//       </div>
//       <div className="mb-4">
//         <h4 className="font-medium mb-2">Ingredients:</h4>
//         <ul className="text-sm text-gray-600 list-disc pl-4 max-h-40 overflow-y-auto">
//           {meal.ingredients.map((ingredient, idx) => (
//             <li key={idx} className="mb-1">{ingredient}</li>
//           ))}
//         </ul>
//       </div>
//       <a
//         href={meal.sourceUrl}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="block text-center bg-green-100 text-green-700 py-2 rounded-md hover:bg-green-200 transition-colors"
//       >
//         View Recipe
//       </a>
//     </div>
//   </div>
// )

// export default function MealPlannerPage() {
//   const { user } = useAuth()
//   const router = useRouter()
//   const [meals, setMeals] = useState<Meal[]>([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [preferences, setPreferences] = useState({
//     targetCalories: '',
//     diet: '',
//     excludeIngredients: '',
//     mealCount: 3
//   })

//   useEffect(() => {
//     if (!user) {
//       router.push('/auth/login')
//     }
//   }, [user, router])

//   const dietOptions = [
//     'gluten free',
//     'ketogenic',
//     'vegetarian',
//     'lacto-vegetarian',
//     'ovo-vegetarian',
//     'vegan',
//     'pescetarian',
//     'paleo',
//     'primal',
//     'whole30'
//   ]

//   const fetchMealPlan = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')
    
//     try {
//       const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY
      
//       if (!API_KEY) {
//         throw new Error('Missing API configuration')
//       }

//       if (preferences.targetCalories && (isNaN(Number(preferences.targetCalories)) || Number(preferences.targetCalories) < 0)) {
//         throw new Error('Please enter valid calories')
//       }

//       const params = new URLSearchParams({
//         apiKey: API_KEY,
//         number: preferences.mealCount.toString(),
//         addRecipeInformation: 'true',
//         fillIngredients: 'true'
//       })

//       if (preferences.diet) params.append('diet', preferences.diet)
//       if (preferences.targetCalories) params.append('maxCalories', preferences.targetCalories)
//       if (preferences.excludeIngredients) {
//         params.append('excludeIngredients', preferences.excludeIngredients)
//       }

//       const response = await fetch(
//         `https://api.spoonacular.com/recipes/random?${params.toString()}`,
//         { cache: 'no-store' }
//       )

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => null)
//         throw new Error(errorData?.message || `API Error: ${response.status}`)
//       }

//       const data = await response.json()

//       if (!data.recipes || data.recipes.length === 0) {
//         throw new Error('No recipes found matching your criteria')
//       }

//       const formattedMeals = await Promise.all(
//         data.recipes.map(async (recipe: any) => {
//           // Fetch nutrition info for each recipe
//           const nutritionResponse = await fetch(
//             `https://api.spoonacular.com/recipes/${recipe.id}/nutritionWidget.json?apiKey=${API_KEY}`
//           )
//           const nutritionData = await nutritionResponse.json()

//           return {
//             id: recipe.id,
//             title: recipe.title,
//             image: recipe.image,
//             calories: nutritionData.calories,
//             servings: recipe.servings,
//             ingredients: recipe.extendedIngredients.map((ing: any) => ing.original),
//             sourceUrl: recipe.sourceUrl,
//             diets: recipe.diets
//           }
//         })
//       )

//       setMeals(formattedMeals)
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to generate meal plan')
//       console.error('Meal plan error:', err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!user) return null

//   return (
//     <div className="min-h-screen bg-cooking">
//       <Navbar />
//       <div className="min-h-screen bg-black/50 p-4 md:p-8 pt-24">
//         <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 md:p-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-8 text-center">
//             Meal Planner
//           </h1>
          
//           <form onSubmit={fetchMealPlan} className="space-y-6 mb-8">
//             <div className="grid gap-6 md:grid-cols-2">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Maximum Calories (per serving)
//                 </label>
//                 <input
//                   type="number"
//                   min="0"
//                   step="50"
//                   className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   value={preferences.targetCalories}
//                   onChange={(e) => setPreferences(prev => ({
//                     ...prev,
//                     targetCalories: e.target.value
//                   }))}
//                   placeholder="e.g., 500"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Diet Type
//                 </label>
//                 <select
//                   className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   value={preferences.diet}
//                   onChange={(e) => setPreferences(prev => ({
//                     ...prev,
//                     diet: e.target.value
//                   }))}
//                 >
//                   <option value="">Any</option>
//                   {dietOptions.map(diet => (
//                     <option key={diet} value={diet}>
//                       {diet.charAt(0).toUpperCase() + diet.slice(1)}
//                     </option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Exclude Ingredients
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   value={preferences.excludeIngredients}
//                   onChange={(e) => setPreferences(prev => ({
//                     ...prev,
//                     excludeIngredients: e.target.value
//                   }))}
//                   placeholder="e.g., nuts, shellfish (comma-separated)"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Number of Meals
//                 </label>
//                 <select
//                   className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   value={preferences.mealCount}
//                   onChange={(e) => setPreferences(prev => ({
//                     ...prev,
//                     mealCount: parseInt(e.target.value)
//                   }))}
//                 >
//                   {[1, 2, 3, 4, 5].map(num => (
//                     <option key={num} value={num}>{num}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
            
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400 text-lg font-medium"
//             >
//               {loading ? 'Generating...' : 'Generate Meal Plan'}
//             </button>
//           </form>

//           {error && (
//             <Alert variant="destructive" className="mb-6">
//               <AlertDescription>{error}</AlertDescription>
//             </Alert>
//           )}

//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {meals.map(meal => (
//               <MealCard key={meal.id} meal={meal} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



//ye dekh achha hai par eeror de raha hai


