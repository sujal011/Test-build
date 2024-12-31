// app/api/groq/route.js
import { createClient } from 'next-sanity';
import Groq from 'groq-sdk';

const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2023-04-03',
    useCdn: process.env.NODE_ENV === 'production',
    token: process.env.SANITY_API_TOKEN,
});

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
    try {
        const { recipe, dietType } = await request.json();

        if (
            (dietType === 'vegetarian' && !recipe.isVegetarian) ||
            (dietType === 'non-vegetarian' && recipe.isVegetarian)
        ) {
            return Response.json({ error: 'Recipe does not match dietary preferences' }, { status: 400 });
        }

        // 1. Check if recipe exists in Sanity
        let groqQuery = `*[_type == "recipe" && title == "${recipe.title}"]{...,}[0]`;
        const existingRecipe = await sanityClient.fetch(groqQuery);

        if (existingRecipe) {
            return Response.json(existingRecipe); // Return existing recipe
        }

        // 2. Enhance recipe with Groq (LLM) ONLY if it doesn't exist in sanity
        const completion = await groq.chat.completions.create({
            messages: [ /* ... (same LLM prompt as before) */ ],
            model: 'mixtral-8x7b-32768',
            temperature: 0.7,
        });

        const enhancedContent = JSON.parse(completion.choices[0].message.content);

        const enhancedRecipe = {
            ...recipe,
            introduction: enhancedContent.introduction,
            instructions: enhancedContent.instructions,
        };

        // 3. Create the enhanced recipe in Sanity
        const sanityResult = await sanityClient.create({
            _type: 'recipe',
            title: enhancedRecipe.title,
            ingredients: enhancedRecipe.ingredients,
            instructions: enhancedRecipe.instructions,
            isVegetarian: enhancedRecipe.isVegetarian,
            image: enhancedRecipe.image,
            introduction: enhancedRecipe.introduction, // Save the LLM-generated intro
        });

        return Response.json(sanityResult); // Return the newly created Sanity document
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: 'Failed to process recipe' }, { status: 500 });
    }
}