// 'use client'

// import { useAuth } from '../contexts/AuthContext'
// import { useRouter } from 'next/navigation'
// import { useEffect } from 'react'
// import Navbar from '../components/Navbar'

// export default function RecipeGeneratorPage() {
//   const { user } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     if (!user) {
//       router.push('/auth/login')
//     }
//   }, [user, router])

//   if (!user) {
//     return null // or a loading spinner
//   }

//   return (
//     <div className="min-h-screen bg-cooking">
//       <Navbar />
//       <div className="min-h-screen bg-black/50 p-8 pt-24"> {/* Added pt-24 for navbar space */}
//         <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
//           <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
//             Recipe Generator
//           </h1>
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <p className="text-gray-600 text-center mb-8">
//               Our AI-powered recipe generator will help you create delicious meals based on your preferences and available ingredients.
//             </p>
//             {/* Recipe generator functionality will be added here */}
//             <div className="text-center text-gray-500">
//               Coming soon...
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



// for full recipe generator:'
// 'use client'

// import { useAuth } from '../contexts/AuthContext'
// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from 'react'
// import Navbar from '../components/Navbar'
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"

// interface Recipe {
//   id: number
//   title: string
//   image: string
//   readyInMinutes: number
//   servings: number
//   vegetarian: boolean
//   cuisines: string[]
//   healthScore: number
//   calories: number
//   analyzedInstructions: {
//     steps: {
//       number: number
//       step: string
//     }[]
//   }[]
//   nutrition: {
//     nutrients: {
//       name: string
//       amount: number
//       unit: string
//     }[]
//   }
// }

// export default function RecipeGeneratorPage() {
//   const { user } = useAuth()
//   const router = useRouter()
//   const [ingredients, setIngredients] = useState('')
//   const [dietType, setDietType] = useState('all')
//   const [recipes, setRecipes] = useState<Recipe[]>([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

//   useEffect(() => {
//     if (!user) {
//       router.push('/auth/login')
//     }
//   }, [user, router])

//   const getNutrientValue = (recipe: Recipe, nutrientName: string): string => {
//     const nutrient = recipe.nutrition?.nutrients?.find(n => n.name.toLowerCase() === nutrientName.toLowerCase())
//     return nutrient ? `${nutrient.amount}${nutrient.unit}` : 'N/A'
//   }

//   const generateRecipes = async () => {
//     try {
//       setLoading(true)
//       setError(null)

//       const spoonacularUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}&ingredients=${encodeURIComponent(ingredients)}&addRecipeInformation=true&fillIngredients=true&number=9&instructionsRequired=true&addRecipeNutrition=true`
      
//       const response = await fetch(spoonacularUrl)
      
//       if (!response.ok) {
//         throw new Error(`Spoonacular API error: ${response.status}`)
//       }
      
//       const data = await response.json()

//       if (!data.results || data.results.length === 0) {
//         setError('No recipes found for these ingredients. Try different ingredients.')
//         return
//       }

//       let filteredRecipes = data.results
//       if (dietType === 'vegetarian') {
//         filteredRecipes = filteredRecipes.filter(recipe => recipe.vegetarian)
//       } else if (dietType === 'non-vegetarian') {
//         filteredRecipes = filteredRecipes.filter(recipe => !recipe.vegetarian)
//       }

//       setRecipes(filteredRecipes)

//       if (filteredRecipes.length === 0) {
//         setError(`No ${dietType} recipes found for these ingredients.`)
//       }

//     } catch (err) {
//       console.error('Error in generateRecipes:', err)
//       setError(err instanceof Error ? err.message : 'Failed to generate recipes')
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!user) {
//     return null
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />
//       <div className="min-h-screen p-8 pt-24">
//         <div className="max-w-6xl mx-auto">
//           <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
//             <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
//               Recipe Generator
//             </h1>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <Label htmlFor="ingredients">Enter Your Ingredients</Label>
//                 <Input
//                   id="ingredients"
//                   placeholder="e.g., chicken, rice, tomatoes"
//                   value={ingredients}
//                   onChange={(e) => setIngredients(e.target.value)}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="diet">Dietary Preference</Label>
//                 <Select value={dietType} onValueChange={setDietType}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select diet type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All</SelectItem>
//                     <SelectItem value="vegetarian">Vegetarian</SelectItem>
//                     <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <Button 
//               className="w-full mt-6 bg-green-600 hover:bg-green-700"
//               onClick={generateRecipes}
//               disabled={loading || !ingredients.trim()}
//             >
//               {loading ? 'Finding Recipes...' : 'Generate Recipes'}
//             </Button>

//             {error && (
//               <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center mt-6">
//                 {error}
//               </div>
//             )}
//           </div>

//           {/* Recipe Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {recipes.map((recipe) => (
//               <Dialog key={recipe.id}>
//                 <DialogTrigger asChild>
//                   <Card className="cursor-pointer hover:shadow-xl transition-shadow">
//                     <CardContent className="p-4">
//                       <div className="space-y-4">
//                         <img 
//                           src={recipe.image} 
//                           alt={recipe.title}
//                           className="w-full h-48 object-cover rounded-lg"
//                         />
//                         <h3 className="font-semibold text-lg">{recipe.title}</h3>
//                         <div className="flex justify-between text-sm text-gray-600">
//                           <span>{recipe.readyInMinutes} minutes</span>
//                           <span>{getNutrientValue(recipe, 'Calories')} calories</span>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </DialogTrigger>
//                 <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
//                   <DialogHeader>
//                     <DialogTitle>{recipe.title}</DialogTitle>
//                   </DialogHeader>
//                   <div className="space-y-4">
//                     <img 
//                       src={recipe.image} 
//                       alt={recipe.title}
//                       className="w-full h-64 object-cover rounded-lg"
//                     />
                    
//                     <div className="grid grid-cols-2 gap-4 text-sm">
//                       <div>
//                         <p><strong>Cooking Time:</strong> {recipe.readyInMinutes} minutes</p>
//                         <p><strong>Servings:</strong> {recipe.servings}</p>
//                         <p><strong>Diet:</strong> {recipe.vegetarian ? 'Vegetarian' : 'Non-Vegetarian'}</p>
//                       </div>
//                       <div>
//                         <p><strong>Cuisine:</strong> {recipe.cuisines?.length ? recipe.cuisines.join(', ') : 'Not specified'}</p>
//                         <p><strong>Health Score:</strong> {recipe.healthScore}</p>
//                       </div>
//                     </div>

//                     <div>
//                       <h4 className="font-semibold mb-2">Nutrition per serving:</h4>
//                       <div className="grid grid-cols-2 gap-2 text-sm">
//                         <p>Calories: {getNutrientValue(recipe, 'Calories')}</p>
//                         <p>Protein: {getNutrientValue(recipe, 'Protein')}</p>
//                         <p>Carbohydrates: {getNutrientValue(recipe, 'Carbohydrates')}</p>
//                         <p>Fat: {getNutrientValue(recipe, 'Fat')}</p>
//                       </div>
//                     </div>

//                     {recipe.analyzedInstructions?.[0]?.steps && (
//                       <div>
//                         <h4 className="font-semibold mb-2">Instructions:</h4>
//                         <ol className="list-decimal list-inside space-y-1">
//                           {recipe.analyzedInstructions[0].steps.map((step) => (
//                             <li key={step.number} className="text-sm">
//                               {step.step}
//                             </li>
//                           ))}
//                         </ol>
//                       </div>
//                     )}
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
// File: app/pages/RecipeGeneratorPage.tsx (or .js if not using TypeScript)

'use client'

import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"

// Types
interface Step {
  number: number;
  step: string;
}

interface Instructions {
  steps: Step[];
}

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  vegetarian: boolean;
  cuisines: string[];
  healthScore: number;
  analyzedInstructions: Instructions[];
  nutrition: {
    nutrients: {
      name: string;
      amount: number;
      unit: string;
    }[];
  };
}

interface SpoonacularResponse {
  results: Recipe[];
}

// RecipeCard Component
const RecipeCard = ({ recipe, onClick }: { recipe: Recipe; onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="overflow-hidden cursor-pointer hover:shadow-xl transition-shadow bg-white"
        onClick={onClick}
      >
        <div className="grid md:grid-cols-3 gap-4">
          {/* Image Section */}
          <div className="relative h-[200px] md:h-full">
            {recipe.image ? (
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
            {/* Diet Badge */}
            <div className="absolute top-2 left-2">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                recipe.vegetarian 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              }`}>
                {recipe.vegetarian ? '🥬 Vegetarian' : '🍖 Non-Vegetarian'}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="md:col-span-2 p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-800 line-clamp-2">
                  {recipe.title}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    ⏱️ {recipe.readyInMinutes} mins
                  </span>
                  <span className="flex items-center">
                    👥 Serves {recipe.servings}
                  </span>
                  <span className="flex items-center">
                    ❤️ Health Score {recipe.healthScore}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {recipe.cuisines?.map((cuisine) => (
                    <span
                      key={cuisine}
                      className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="font-medium text-gray-700">Nutrition:</p>
                  <p>Calories: {recipe.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount.toFixed(0) || 'N/A'} kcal</p>
                  <p>Protein: {recipe.nutrition?.nutrients?.find(n => n.name === 'Protein')?.amount.toFixed(1) || 'N/A'}g</p>
                </div>
                <div className="space-y-1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    View Recipe
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
// RecipeModal Component
const RecipeModal = ({ recipe, isOpen, onClose }: { recipe: Recipe; isOpen: boolean; onClose: () => void }) => {
  const getNutrientValue = (nutrientName: string): string => {
    const nutrient = recipe.nutrition?.nutrients?.find(n => n.name.toLowerCase() === nutrientName.toLowerCase());
    return nutrient ? `${nutrient.amount}${nutrient.unit}` : 'N/A';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">{recipe.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {recipe.image && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative h-[300px] rounded-lg overflow-hidden"
            >
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div className="flex items-center space-x-4 text-white">
                  <span>⏱️ {recipe.readyInMinutes} mins</span>
                  <span>👥 Serves {recipe.servings}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    recipe.vegetarian 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {recipe.vegetarian ? '🥬 Vegetarian' : '🍖 Non-Vegetarian'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Cuisines</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {recipe.cuisines?.map((cuisine) => (
                    <span
                      key={cuisine}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <h3 className="font-semibold text-lg">Nutrition per serving</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span>Calories:</span>
                      <span className="font-medium">{getNutrientValue('Calories')}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Protein:</span>
                      <span className="font-medium">{getNutrientValue('Protein')}</span>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span>Carbs:</span>
                      <span className="font-medium">{getNutrientValue('Carbohydrates')}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Fat:</span>
                      <span className="font-medium">{getNutrientValue('Fat')}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {recipe.analyzedInstructions?.[0]?.steps && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="font-semibold text-lg">Instructions</h3>
                <ol className="space-y-3">
                  {recipe.analyzedInstructions[0].steps.map((step, index) => (
                    <motion.li 
                      key={step.number}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 items-start"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-sm font-medium">
                        {step.number}
                      </span>
                      <span className="text-gray-700">{step.step}</span>
                    </motion.li>
                  ))}
                </ol>
              </motion.div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
