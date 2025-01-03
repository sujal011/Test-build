// app/api/recipes/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-03',
  token: process.env.SANITY_API_TOKEN,
  useCdn: true,
})

export async function POST(req: Request) {
  try {
    const { filters } = await req.json()
    
    // Simplified query to get all recipes matching criteria
    const query = `*[_type == "recipes"] {
      _id,
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
      dietType,
      healthGoals,
      calories,
      protein,
      carbs,
      fat
    }`
    
    const recipes = await client.fetch(query)
    
    // Filter recipes based on user preferences
    const filteredRecipes = recipes.filter((recipe: any) => {
      const matchesDiet = filters.dietaryPreferences.dietType.length === 0 || 
                         filters.dietaryPreferences.dietType.includes(recipe.dietType)
      
      const matchesGoals = filters.healthGoals.length === 0 ||
                          filters.healthGoals.some((goal: string) => recipe.healthGoals?.includes(goal))
      
      const matchesCookingTime = recipe.cookingTime === filters.mealPlanning.cookingTime
      
      return matchesDiet && matchesGoals && matchesCookingTime
    })

    return NextResponse.json(filteredRecipes)
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 })
  }
}