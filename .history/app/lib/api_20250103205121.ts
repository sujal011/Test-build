import { createClient } from '@sanity/client'

// Sanity client setup
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2021-03-25',
})

// Function to fetch recipes from Spoonacular
export async function fetchRecipes(query: string, number: number = 10) {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
  if (!apiKey) {
    throw new Error('Spoonacular API key is not set');
  }

  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=${number}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  return response.json();
}

// Function to save user preferences to Sanity
export async function saveUserPreferences(userId: string, preferences: any) {
  try {
    const result = await sanityClient.create({
      _type: 'userPreferences',
      userId,
      ...preferences,
    });
    return result;
  } catch (error) {
    console.error('Error saving user preferences:', error);
    throw error;
  }
}

// Function to fetch user preferences from Sanity
export async function fetchUserPreferences(userId: string) {
  try {
    const result = await sanityClient.fetch(
      `*[_type == "userPreferences" && userId == $userId][0]`,
      { userId }
    );
    return result;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    throw error;
  }
}

