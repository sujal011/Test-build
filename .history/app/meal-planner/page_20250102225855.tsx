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


// 'use client'

// import { useAuth } from '../contexts/AuthContext'
// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import Navbar from '../components/Navbar'
// import { Alert, AlertDescription } from '@/components/ui/alert'
// import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'

// interface Meal {
//   id: number
//   title: string
//   image: string
//   calories: number
//   servings: number
//   ingredients: string[]
//   sourceUrl: string
//   diets: string[]
//   nutrients: {
//     protein: number
//     carbs: number
//     fat: number
//     fiber: number
//   }
// }

// interface UserInfo {
//   age: number
//   weight: number
//   height: number
//   gender: 'male' | 'female'
//   activityLevel: ActivityLevel
// }

// type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive'

// interface Preferences {
//   diet: string
//   excludeIngredients: string
//   mealCount: number
// }

// interface NutrientData {
//   name: string
//   value: number
//   color: string
// }

// const ACTIVITY_MULTIPLIERS = {
//   sedentary: 1.2,
//   light: 1.375,
//   moderate: 1.55,
//   active: 1.725,
//   veryActive: 1.9
// } as const

// const ACTIVITY_LEVELS = [
//   { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
//   { value: 'light', label: 'Light (exercise 1-3 times/week)' },
//   { value: 'moderate', label: 'Moderate (exercise 3-5 times/week)' },
//   { value: 'active', label: 'Active (exercise 6-7 times/week)' },
//   { value: 'veryActive', label: 'Very Active (hard exercise daily)' }
// ] as const

// const DIET_OPTIONS = [
//   'gluten free',
//   'ketogenic',
//   'vegetarian',
//   'lacto-vegetarian',
//   'ovo-vegetarian',
//   'vegan',
//   'pescetarian',
//   'paleo',
//   'primal',
//   'whole30'
// ] as const

// const calculateBMI = (weight: number, height: number): number => {
//   if (height <= 0 || weight <= 0) return 0
//   return weight / ((height / 100) * (height / 100))
// }

// const calculateTDEE = (
//   weight: number,
//   height: number,
//   age: number,
//   gender: 'male' | 'female',
//   activityLevel: ActivityLevel
// ): number => {
//   if (weight <= 0 || height <= 0 || age <= 0) return 0
  
//   // Harris-Benedict equation for BMR
//   const bmr = gender === 'male'
//     ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
//     : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)

//   return bmr * ACTIVITY_MULTIPLIERS[activityLevel]
// }

// const MealCard = ({ meal }: { meal: Meal }) => {
//   const nutrientData: NutrientData[] = [
//     { name: 'Protein', value: meal.nutrients.protein, color: '#FF8042' },
//     { name: 'Carbs', value: meal.nutrients.carbs, color: '#00C49F' },
//     { name: 'Fat', value: meal.nutrients.fat, color: '#FFBB28' },
//     { name: 'Fiber', value: meal.nutrients.fiber, color: '#0088FE' }
//   ]

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//       <div className="relative">
//         <img
//           src={meal.image}
//           alt={meal.title}
//           className="w-full h-48 object-cover"
//         />
//         {meal.diets.length > 0 && (
//           <div className="absolute top-2 right-2">
//             <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
//               {meal.diets[0]}
//             </span>
//           </div>
//         )}
//       </div>
//       <div className="p-4">
//         <h3 className="font-semibold text-lg mb-2 line-clamp-2">{meal.title}</h3>
//         <div className="flex justify-between text-sm text-gray-600 mb-3">
//           <span>{Math.round(meal.calories)} cal/serving</span>
//           <span>{meal.servings} servings</span>
//         </div>

//         <div className="mb-4 flex justify-center">
//           <PieChart width={200} height={200}>
//             <Pie
//               data={nutrientData}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius={60}
//               fill="#8884d8"
//               label
//             >
//               {nutrientData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={entry.color} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </div>

//         <div className="mb-4">
//           <h4 className="font-medium mb-2">Ingredients:</h4>
//           <ul className="text-sm text-gray-600 list-disc pl-4 max-h-40 overflow-y-auto">
//             {meal.ingredients.map((ingredient, idx) => (
//               <li key={idx} className="mb-1">{ingredient}</li>
//             ))}
//           </ul>
//         </div>
        
//         <a
//           href={meal.sourceUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="block text-center bg-green-100 text-green-700 py-2 rounded-md hover:bg-green-200 transition-colors"
//         >
//           View Recipe
//         </a>
//       </div>
//     </div>
//   )
// }

// export default function MealPlannerPage() {
//   const { user } = useAuth()
//   const router = useRouter()
//   const [meals, setMeals] = useState<Meal[]>([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
  
//   const [userInfo, setUserInfo] = useState<UserInfo>({
//     age: 25,
//     weight: 70,
//     height: 170,
//     gender: 'male',
//     activityLevel: 'sedentary'
//   })

//   const [preferences, setPreferences] = useState<Preferences>({
//     diet: '',
//     excludeIngredients: '',
//     mealCount: 3
//   })

//   useEffect(() => {
//     if (!user) {
//       router.push('/login')
//     }
//   }, [user, router])

//   const fetchMealPlan = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')
    
//     try {
//       const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY
      
//       if (!API_KEY) {
//         throw new Error('Missing API configuration')
//       }

//       const tdee = calculateTDEE(
//         userInfo.weight,
//         userInfo.height,
//         userInfo.age,
//         userInfo.gender,
//         userInfo.activityLevel
//       )

//       const params = new URLSearchParams({
//         apiKey: API_KEY,
//         number: preferences.mealCount.toString(),
//         addRecipeInformation: 'true',
//         fillIngredients: 'true',
//         maxCalories: Math.round(tdee / preferences.mealCount).toString()
//       })

//       if (preferences.diet) params.append('diet', preferences.diet)
//       if (preferences.excludeIngredients) {
//         params.append('excludeIngredients', preferences.excludeIngredients)
//       }

//       const response = await fetch(
//         `https://api.spoonacular.com/recipes/random?${params.toString()}`,
//         { 
//           cache: 'no-store',
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
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
//           try {
//             const nutritionResponse = await fetch(
//               `https://api.spoonacular.com/recipes/${recipe.id}/nutritionWidget.json?apiKey=${API_KEY}`,
//               {
//                 headers: {
//                   'Content-Type': 'application/json'
//                 }
//               }
//             )
            
//             if (!nutritionResponse.ok) {
//               throw new Error('Failed to fetch nutrition data')
//             }
            
//             const nutritionData = await nutritionResponse.json()

//             return {
//               id: recipe.id,
//               title: recipe.title,
//               image: recipe.image,
//               calories: nutritionData.calories,
//               servings: recipe.servings,
//               ingredients: recipe.extendedIngredients.map((ing: any) => ing.original),
//               sourceUrl: recipe.sourceUrl,
//               diets: recipe.diets,
//               nutrients: {
//                 protein: nutritionData.nutrients.find((n: any) => n.name === 'Protein')?.amount ?? 0,
//                 carbs: nutritionData.nutrients.find((n: any) => n.name === 'Carbohydrates')?.amount ?? 0,
//                 fat: nutritionData.nutrients.find((n: any) => n.name === 'Fat')?.amount ?? 0,
//                 fiber: nutritionData.nutrients.find((n: any) => n.name === 'Fiber')?.amount ?? 0
//               }
//             }
//           } catch (err) {
//             console.error('Error processing recipe:', err)
//             return null
//           }
//         })
//       )

//       const validMeals = formattedMeals.filter((meal): meal is Meal => meal !== null)
      
//       if (validMeals.length === 0) {
//         throw new Error('Failed to process meal data')
//       }

//       setMeals(validMeals)
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to generate meal plan')
//       console.error('Meal plan error:', err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!user) return null

//   const bmi = calculateBMI(userInfo.weight, userInfo.height)
//   const tdee = calculateTDEE(
//     userInfo.weight,
//     userInfo.height,
//     userInfo.age,
//     userInfo.gender,
//     userInfo.activityLevel
//   )

//   return (
//     <div className="min-h-screen bg-cooking">
//       <Navbar />
//       <div className="min-h-screen bg-black/50 p-4 md:p-8 pt-24">
//         <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 md:p-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-8 text-center">
//             Personalized Meal Planner
//           </h1>
          
//           <form onSubmit={fetchMealPlan} className="space-y-6 mb-8">
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Age
//                 </label>
//                 <input
//                   type="number"
//                   min="1"
//                   max="120"
//                   className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   value={userInfo.age}
//                   onChange={(e) => setUserInfo(prev => ({
//                     ...prev,
//                     age: Math.max(1, Math.min(120, parseInt(e.target.value) || 0))
//                   }))}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Weight (kg)
//                 </label>
//                 <input
//                   type="number"
//                   min="20"
//                   max="300"
//                   className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   value={userInfo.weight}
//                   onChange={(e) => setUserInfo(prev => ({
//                     ...prev,
//                     weight: Math.max(20, Math.min(300, parseInt(e.target.value) || 0))
//                   }))}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Height (cm)
//                 </label>
//                 <input
//                   type="number"
//                   min="100"
//                   max="250"
//                   className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   value={userInfo.height}
//                   onChange={(e) => setUserInfo(prev => ({
//                     ...prev,
//                     height: Math.max(100, Math.min(250, parseInt(e.target.value) || 0))
//                   }))}
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Gender
//                 </label>
//                 <select
//                   className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   value={userInfo.gender}
//                   onChange={(e) => setUserInfo(prev => ({
//                     ...prev,
//                     gender: e.target.value as 'male' | 'female'
//                   }))}
//                 >
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Activity Level
//                 </label>
//                 <select
//                   className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   value={userInfo.activityLevel}
//                   onChange={(e) => setUserInfo(prev => ({
//                     ...prev,
//                     activityLevel: e.target.value as ActivityLevel
//                   }))}
//                 >
//                   {ACTIVITY_LEVELS.map(level => (
//                     <option key={level.value} value={level.value}>
//                       {level.label}
//                     </option>
//                   ))}
//                 </select>
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
//                   {DIET_OPTIONS.map(diet => (
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
//                     excludeIngredients: e.target.value.trim()
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
//                     mealCount: Math.max(1, Math.min(5, parseInt(e.target.value) || 3))
//                   }))}
//                 >
//                   {[1, 2, 3, 4, 5].map(num => (
//                     <option key={num} value={num}>{num}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
//               <div>
//                 <h3 className="font-semibold mb-2">Your BMI:</h3>
//                 <p className="text-lg">
//                   {bmi.toFixed(1)} ({getBMICategory(bmi)})
//                 </p>
//               </div>
//               <div>
//                 <h3 className="font-semibold mb-2">Daily Calorie Need:</h3>
//                 <p className="text-lg">{Math.round(tdee)} calories</p>
//               </div>
//             </div>
            
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-green-400 text-lg font-medium"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Generating...
//                 </span>
//               ) : 'Generate Meal Plan'}
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

// function getBMICategory(bmi: number): string {
//   if (bmi < 18.5) return 'Underweight'
//   if (bmi < 25) return 'Normal weight'
//   if (bmi < 30) return 'Overweight'
//   return 'Obese'
// }

'use client'

mport { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
/// import { Alert, AlertDescription } from '@/components/ui/alert'
// import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface UserInfo {
  age: number
  weight: number
  height: number
  gender: string
  activityLevel: string
}

interface Preferences {
  dietaryTypes: string[]
  cuisinePreferences: string[]
  allergens: string[]
  spiceLevel: number
  mealsPerDay: number
  budget: string
  cookingTime: string
}

interface HealthGoals {
  selectedGoals: string[]
}

const CUISINE_OPTIONS = [
  'Mediterranean',
  'Asian',
  'Indian',
  'Mexican',
  'Italian',
  'American',
  'Middle Eastern',
  'Japanese',
  'Thai',
  'French'
]

const DIETARY_TYPES = [
  'None',
  'Vegetarian',
  'Vegan',
  'Pescatarian',
  'Paleo',
  'Keto',
  'Mediterranean',
  'Gluten-Free',
  'Dairy-Free'
]

const ALLERGENS = [
  'None',
  'Dairy',
  'Eggs',
  'Fish',
  'Shellfish',
  'Tree Nuts',
  'Peanuts',
  'Wheat',
  'Soy'
]

const HEALTH_GOALS = [
  'Weight Loss',
  'Muscle Gain',
  'Maintenance',
  'Heart Health',
  'Energy Boost',
  'Better Sleep',
  'Digestive Health',
  'Athletic Performance'
]

const COOKING_TIMES = [
  'Quick (15-20 mins)',
  'Moderate (30-60 mins)',
  'Extended (60+ mins)'
]

const BUDGET_OPTIONS = [
  'Budget-friendly',
  'Moderate',
  'Premium'
]

export default function MealPlannerPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [userInfo, setUserInfo] = useState<UserInfo>({
    age: 25,
    weight: 70,
    height: 170,
    gender: '',
    activityLevel: ''
  })

  const [preferences, setPreferences] = useState<Preferences>({
    dietaryTypes: [],
    cuisinePreferences: [],
    allergens: [],
    spiceLevel: 50,
    mealsPerDay: 3,
    budget: 'Moderate',
    cookingTime: 'Moderate (30-60 mins)'
  })

  const [healthGoals, setHealthGoals] = useState<HealthGoals>({
    selectedGoals: []
  })

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  const handleHealthGoalToggle = (goal: string) => {
    setHealthGoals(prev => ({
      selectedGoals: prev.selectedGoals.includes(goal)
        ? prev.selectedGoals.filter(g => g !== goal)
        : [...prev.selectedGoals, goal]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      // Your API call logic here
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate meal plan')
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-[url('/food-bg.jpg')] bg-cover bg-center">
      <div className="min-h-screen bg-black/40 p-4 md:p-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 to-teal-300 bg-clip-text text-transparent">
              Personalized Meal Planner
            </h1>
            <p className="text-white/90 mt-2 text-lg">
              Your Journey to Healthier Eating Starts Here 🥗 ✨
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Personal Details Card */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="text-lg">🏃</span> Personal Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={userInfo.age}
                      onChange={(e) => setUserInfo(prev => ({
                        ...prev,
                        age: parseInt(e.target.value) || 0
                      }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={userInfo.gender}
                      onValueChange={(value) => setUserInfo(prev => ({
                        ...prev,
                        gender: value
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        value={userInfo.height}
                        onChange={(e) => setUserInfo(prev => ({
                          ...prev,
                          height: parseInt(e.target.value) || 0
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        value={userInfo.weight}
                        onChange={(e) => setUserInfo(prev => ({
                          ...prev,
                          weight: parseInt(e.target.value) || 0
                        }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="activity">Activity Level</Label>
                    <Select
                      value={userInfo.activityLevel}
                      onValueChange={(value) => setUserInfo(prev => ({
                        ...prev,
                        activityLevel: value
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary</SelectItem>
                        <SelectItem value="light">Light Exercise</SelectItem>
                        <SelectItem value="moderate">Moderate Exercise</SelectItem>
                        <SelectItem value="active">Very Active</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Health Goals Card */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="text-lg">🎯</span> Health Goals
                </h2>
                <div className="grid grid-cols-2 gap-2">
                  {HEALTH_GOALS.map(goal => (
                    <Button
                      key={goal}
                      variant={healthGoals.selectedGoals.includes(goal) ? "default" : "outline"}
                      className="h-auto py-2 px-3 text-sm justify-start"
                      onClick={() => handleHealthGoalToggle(goal)}
                      type="button"
                    >
                      {goal}
                    </Button>
                  ))}
                </div>
              </Card>

              {/* Dietary Preferences Card */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="text-lg">🥗</span> Dietary Preferences
                </h2>
                <div className="space-y-6">
                  <Tabs defaultValue="diet">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="diet">Diet Types</TabsTrigger>
                      <TabsTrigger value="cuisine">Cuisine</TabsTrigger>
                    </TabsList>
                    <TabsContent value="diet" className="space-y-2 pt-2">
                      <div className="flex flex-wrap gap-2">
                        {DIETARY_TYPES.map(diet => (
                          <Badge
                            key={diet}
                            variant={preferences.dietaryTypes.includes(diet) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => setPreferences(prev => ({
                              ...prev,
                              dietaryTypes: prev.dietaryTypes.includes(diet)
                                ? prev.dietaryTypes.filter(d => d !== diet)
                                : [...prev.dietaryTypes, diet]
                            }))}
                          >
                            {diet}
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="cuisine" className="space-y-2 pt-2">
                      <div className="flex flex-wrap gap-2">
                        {CUISINE_OPTIONS.map(cuisine => (
                          <Badge
                            key={cuisine}
                            variant={preferences.cuisinePreferences.includes(cuisine) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => setPreferences(prev => ({
                              ...prev,
                              cuisinePreferences: prev.cuisinePreferences.includes(cuisine)
                                ? prev.cuisinePreferences.filter(c => c !== cuisine)
                                : [...prev.cuisinePreferences, cuisine]
                            }))}
                          >
                            {cuisine}
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div>
                    <Label className="mb-2 block">Allergens</Label>
                    <div className="flex flex-wrap gap-2">
                      {ALLERGENS.map(allergen => (
                        <Badge
                          key={allergen}
                          variant={preferences.allergens.includes(allergen) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setPreferences(prev => ({
                            ...prev,
                            allergens: prev.allergens.includes(allergen)
                              ? prev.allergens.filter(a => a !== allergen)
                              : [...prev.allergens, allergen]
                          }))}
                        >
                          {allergen}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Spice Preference</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[preferences.spiceLevel]}
                        onValueChange={([value]) => setPreferences(prev => ({
                          ...prev,
                          spiceLevel: value
                        }))}
                        max={100}
                        step={1}
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Mild</span>
                        <span>Medium</span>
                        <span>Very Spicy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Meal Planning Card */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="text-lg">📅</span> Meal Planning
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <Label className="mb-2 block">Meals per Day</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[preferences.mealsPerDay]}
                      onValueChange={([value]) => setPreferences(prev => ({
                        ...prev,
                        mealsPerDay: value
                      }))}
                      max={6}
                      min={1}
                      step={1}
                    />
                    <div className="text-center text-sm text-muted-foreground">
                      {preferences.mealsPerDay} meals
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="budget">Budget</Label>
                  <Select
                    value={preferences.budget}
                    onValueChange={(value) => setPreferences(prev => ({
                      ...prev,
                      budget: value
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUDGET_OPTIONS.map(budget => (
                        <SelectItem key={budget} value={budget}>
                          {budget}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="cookingTime">Cooking Time</Label>
                  <Select
                    value={preferences.cookingTime}
                    onValueChange={(value) => setPreferences(prev => ({
                      ...prev,
                      cookingTime: value
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select cooking time" />
                    </SelectTrigger>
                    <SelectContent>
                      {COOKING_TIMES.map(time => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full h-12 text-lg bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600"
              disabled={loading}
            >
              {loading ? 'Generating Your Personalized Meal Plan...' : 'Generate Your Personalized Meal Plan'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

