'use server'

import { MealPlannerFormData } from '@s/meal-planner'

export async function generateMealPlan(data: MealPlannerFormData) {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not set')
  }

  const prompt = `Generate a personalized meal plan based on the following criteria:

Personal Details:
- Age: ${data.personalDetails.age}
- Gender: ${data.personalDetails.gender}
- Height: ${data.personalDetails.height}cm
- Weight: ${data.personalDetails.weight}kg
- Activity Level: ${data.personalDetails.activityLevel}

Health Goals: ${data.healthGoals.goals.join(', ')}

Dietary Preferences:
- Diet Types: ${data.dietaryPreferences.dietTypes.join(', ')}
- Allergens to Avoid: ${data.dietaryPreferences.allergens.join(', ')}
- Spice Preference: ${data.dietaryPreferences.spicePreference}/100

Meal Planning:
- Meals per Day: ${data.mealPlanning.mealsPerDay}
- Budget: ${data.mealPlanning.budget}
- Cooking Time: ${data.mealPlanning.cookingTime}

Please provide a detailed meal plan for one week, including recipes and nutritional information.`

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama2-70b-4096',
      messages: [
        { role: 'system', content: 'You are a helpful nutritionist and meal planner.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result = await response.json()
  return { success: true, data: result.choices[0].message.content }
}

