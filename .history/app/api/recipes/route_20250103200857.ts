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
    const { query, filters } = await req.json()
    
    // Execute GROQ query with filters
    const recipes = await client.fetch(query, {
      cookingTime: filters.cookingTime,
      dietTypes: filters.dietTypes,
      allergens: filters.allergens
    })

    return NextResponse.json(recipes)
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recipes' }, 
      { status: 500 }
    )
  }
}