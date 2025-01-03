
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
          <DialogTitle>{recipe.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {recipe.image && (
            <motion.img 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-64 object-cover rounded-lg"
              loading="lazy"
            />
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Cuisine:</strong> {recipe.cuisines?.length ? recipe.cuisines.join(', ') : 'Not specified'}</p>
              <p><strong>Diet:</strong> {recipe.vegetarian ? '🥬 Vegetarian' : '🍖 Non-Vegetarian'}</p>
            </div>
            <div>
              <p><strong>Servings:</strong> {recipe.servings}</p>
              <p><strong>Health Score:</strong> {recipe.healthScore}</p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h3 className="font-semibold">Nutrition per serving:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p>Calories: {getNutrientValue('Calories')}</p>
              <p>Protein: {getNutrientValue('Protein')}</p>
              <p>Carbohydrates: {getNutrientValue('Carbohydrates')}</p>
              <p>Fat: {getNutrientValue('Fat')}</p>
            </div>
          </motion.div>

          {recipe.analyzedInstructions?.[0]?.steps && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <h3 className="font-semibold">Instructions:</h3>
              <ol className="list-decimal list-inside space-y-1">
                {recipe.analyzedInstructions[0].steps.map((step, index) => (
                  <motion.li 
                    key={step.number}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-sm"
                  >
                    {step.step}
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Main Component
export default function RecipeGeneratorPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [ingredients, setIngredients] = useState('')
  const [dietType, setDietType] = useState('all')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

  useEffect(() => {
    if (!user) {
      router.push('/auth/login')
    }
  }, [user, router])

  const generateRecipes = async () => {
    try {
      setLoading(true)
      setError(null)
      setRecipes([])

      // Clean and format ingredients
      const cleanedIngredients = ingredients
        .split(',')
        .map(i => i.trim())
        .filter(i => i)
        .join(',+')

      // Build query parameters
      const params = new URLSearchParams({
        apiKey: process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY || '',
        query: cleanedIngredients,
        includeIngredients: cleanedIngredients,
        addRecipeInformation: 'true',
        fillIngredients: 'true',
        number: '15',
        instructionsRequired: 'true',
        addRecipeNutrition: 'true',
        sort: 'max-used-ingredients',
        ranking: '2',
        ignorePantry: 'true'
      })

      if (dietType === 'vegetarian') {
        params.append('diet', 'vegetarian')
      }

      const spoonacularUrl = `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`
      const response = await fetch(spoonacularUrl)
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      const data: SpoonacularResponse = await response.json()

      if (!data.results || data.results.length === 0) {
        setError('No recipes found for these ingredients. Try different ingredients.')
        return
      }

      // Filter and sort recipes
      let filteredRecipes = data.results

      if (dietType === 'vegetarian') {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.vegetarian)
      } else if (dietType === 'non-vegetarian') {
        filteredRecipes = filteredRecipes.filter(recipe => !recipe.vegetarian)
      }

      // Additional relevance filtering
      filteredRecipes = filteredRecipes
        .filter(recipe => {
          const searchTerms = ingredients.toLowerCase().split(',').map(i => i.trim())
          const recipeText = `${recipe.title} ${recipe.cuisines.join(' ')}`.toLowerCase()
          return searchTerms.some(term => recipeText.includes(term))
        })
        .slice(0, 10)

      setRecipes(filteredRecipes)

      if (filteredRecipes.length === 0) {
        setError(`No ${dietType} recipes found for these ingredients. Try different ingredients or dietary preference.`)
      }

    } catch (err) {
      console.error('Error in generateRecipes:', err)
      setError(err instanceof Error ? err.message : 'Failed to generate recipes')
    } finally {
      setLoading(false)
    }
  }

  const getIngredientsSummary = (ingredients: string) => {
    return ingredients
      .split(',')
      .map(i => i.trim())
      .filter(i => i)
      .map(i => i.charAt(0).toUpperCase() + i.slice(1))
      .join(', ')
  }

  if (!user) {
    return null
  }

  return (
    // <div className="min-h-screen bg-gray-100">
    //   <Navbar />
    //   <div className="min-h-screen p-8 pt-24">
    //     <motion.div 
    //       initial={{ opacity: 0, y: -20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8"
    //     >
    //       <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
    //         Recipe Generator
    //       </h1>
          
    //       <div className="space-y-6">
    //         <div className="space-y-2">
    //           <Label htmlFor="ingredients">Enter Your Ingredients</Label>
    //           <Input
    //             id="ingredients"
    //             placeholder="e.g., chocolate, butter, sugar"
    //             value={ingredients}
    //             onChange={(e) => setIngredients(e.target.value)}
    //             className="w-full"
    //           />
    //           {ingredients && (
    //             <p className="text-sm text-gray-600">
    //               Searching for recipes with: {getIngredientsSummary(ingredients)}
    //             </p>
    //           )}
    //         </div>
    <div
  className="min-h-screen bg-cover bg-center"
  style={{ backgroundImage: "url('.//bg.jpg')" }} // Make sure the image path is correct
>
  <div className="min-h-screen bg-gray-100 bg-opacity-80">
    <Navbar />
    <div className="min-h-screen p-8 pt-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8"
      >
        <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
          Recipe Generator
        </h1>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="ingredients">Enter Your Ingredients</Label>
            <Input
              id="ingredients"
              placeholder="e.g., chocolate, butter, sugar"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full"
            />
            {ingredients && (
              <p className="text-sm text-gray-600">
                Searching for recipes with: {getIngredientsSummary(ingredients)}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</div>


            <div className="space-y-2">
              <Label htmlFor="diet">Dietary Preference</Label>
              <Select value={dietType} onValueChange={setDietType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select diet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={generateRecipes}
              disabled={loading || !ingredients.trim()}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="animate-spin" />
                  <span>Finding Recipes...</span>
                </div>
              ) : (
                'Generate Recipes'
              )}
            </Button>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-600 p-4 rounded-lg text-center"
              >
                {error}
              </motion.div>
            )}

            <AnimatePresence>
              <div className="space-y-6">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onClick={() => setSelectedRecipe(recipe)}
                  />
                ))}
              </div>
            </AnimatePresence>

            {selectedRecipe && (
              <RecipeModal
                recipe={selectedRecipe}
                isOpen={!!selectedRecipe}
                onClose={() => setSelectedRecipe(null)}
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}