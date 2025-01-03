// Types
export interface Meal {
  name: string;
  calories: number;
  protein: number;
  tags: string[];
  prepTime?: number;
  cookTime?: number;
}

export interface MealCategory {
  high_protein: Meal[];
  low_carb: Meal[];
  balanced: Meal[];
}

export interface MealPlan {
  breakfast: MealCategory;
  lunch: MealCategory;
  dinner: MealCategory;
}

// Constants
export const MEAL_TYPES = ['breakfast', 'lunch', 'dinner'] as const;
export const DIET_TYPES = ['high_protein', 'low_carb', 'balanced'] as const;
export const CUISINE_TAGS = [
  'south_indian',
  'north_indian',
  'kerala',
  'maharashtrian',
  'fusion',
  'vegetarian',
  'keto'
] as const;

// Meal Data
export const MEALS: MealPlan = {
  breakfast: {
    high_protein: [
      { name: 'Pesarattu (Green Moong Dal Dosa)', calories: 320, protein: 16, tags: ['south_indian', 'vegetarian'], prepTime: 15, cookTime: 15 },
      { name: 'Egg Appam with Stew', calories: 380, protein: 18, tags: ['south_indian'], prepTime: 20, cookTime: 20 },
      { name: 'Ragi Idli with Sambar', calories: 290, protein: 12, tags: ['south_indian', 'vegetarian'], prepTime: 15, cookTime: 25 },
      { name: 'Paneer Paratha with Curd', calories: 450, protein: 22, tags: ['north_indian', 'vegetarian'], prepTime: 20, cookTime: 15 },
      { name: 'Chole Kulche', calories: 480, protein: 18, tags: ['north_indian', 'vegetarian'], prepTime: 25, cookTime: 20 },
      { name: 'Egg Bhurji with Multigrain Paratha', calories: 400, protein: 24, tags: ['north_indian'], prepTime: 15, cookTime: 15 },
      { name: 'Moong Dal Chilla', calories: 340, protein: 16, tags: ['north_indian', 'vegetarian'], prepTime: 10, cookTime: 15 },
      { name: 'Sprouts Salad', calories: 220, protein: 14, tags: ['vegetarian'], prepTime: 10, cookTime: 5 }
    ],
    low_carb: [
      { name: 'Cauliflower Upma', calories: 220, protein: 8, tags: ['south_indian', 'keto', 'vegetarian'], prepTime: 15, cookTime: 15 },
      { name: 'Coconut Flour Uttapam', calories: 260, protein: 10, tags: ['south_indian', 'keto', 'vegetarian'], prepTime: 15, cookTime: 15 },
      { name: 'Paneer Bhurji (No Bread)', calories: 280, protein: 18, tags: ['north_indian', 'keto', 'vegetarian'], prepTime: 10, cookTime: 15 },
      { name: 'Mushroom Masala Egg White Omelette', calories: 200, protein: 16, tags: ['north_indian', 'keto'], prepTime: 10, cookTime: 10 },
      { name: 'Avocado Smoothie Bowl', calories: 230, protein: 10, tags: ['keto', 'vegetarian'], prepTime: 10, cookTime: 5 },
      { name: 'Spinach and Cheese Stuffed Omelette', calories: 240, protein: 18, tags: ['keto'], prepTime: 10, cookTime: 10 }
    ],
    balanced: [
      { name: 'Pongal with Sambar', calories: 340, protein: 10, tags: ['south_indian', 'vegetarian'], prepTime: 20, cookTime: 25 },
      { name: 'Puttu with Kadala Curry', calories: 380, protein: 12, tags: ['kerala', 'vegetarian'], prepTime: 20, cookTime: 20 },
      { name: 'Poha with Batata', calories: 320, protein: 8, tags: ['maharashtrian', 'vegetarian'], prepTime: 15, cookTime: 15 },
      { name: 'Misal Pav', calories: 380, protein: 14, tags: ['maharashtrian', 'vegetarian'], prepTime: 20, cookTime: 25 },
      { name: 'Upma', calories: 300, protein: 9, tags: ['south_indian', 'vegetarian'], prepTime: 15, cookTime: 15 },
      { name: 'Daliya Khichdi', calories: 340, protein: 11, tags: ['north_indian', 'vegetarian'], prepTime: 15, cookTime: 20 }
    ]
  },
  lunch: {
    high_protein: [
      { name: 'Andhra Chicken Curry with Quinoa', calories: 480, protein: 35, tags: ['south_indian'], prepTime: 25, cookTime: 35 },
      { name: 'Chettinad Fish Curry with Millet', calories: 450, protein: 32, tags: ['south_indian'], prepTime: 25, cookTime: 30 },
      { name: 'Tandoori Chicken with Roomali Roti', calories: 520, protein: 38, tags: ['north_indian'], prepTime: 30, cookTime: 35 },
      { name: 'Dal Makhani with Paneer Tikka', calories: 580, protein: 26, tags: ['north_indian', 'vegetarian'], prepTime: 25, cookTime: 40 },
      { name: 'Lemon Garlic Prawns with Quinoa', calories: 460, protein: 30, tags: ['fusion'], prepTime: 20, cookTime: 25 },
      { name: 'Grilled Tofu Salad', calories: 360, protein: 20, tags: ['vegetarian'], prepTime: 15, cookTime: 15 }
    ],
    low_carb: [
      { name: 'Cauliflower Rice Bisibelabath', calories: 280, protein: 12, tags: ['south_indian', 'keto', 'vegetarian'], prepTime: 20, cookTime: 25 },
      { name: 'Keto Meen Moilee with Cauliflower Rice', calories: 320, protein: 24, tags: ['kerala', 'keto'], prepTime: 25, cookTime: 30 },
      { name: 'Keto Butter Chicken (No Rice)', calories: 350, protein: 28, tags: ['north_indian', 'keto'], prepTime: 25, cookTime: 30 },
      { name: 'Palak Paneer with Cauliflower Rice', calories: 300, protein: 18, tags: ['north_indian', 'keto', 'vegetarian'], prepTime: 20, cookTime: 25 },
      { name: 'Zucchini Noodles with Pesto', calories: 260, protein: 10, tags: ['fusion', 'keto', 'vegetarian'], prepTime: 15, cookTime: 15 },
      { name: 'Grilled Chicken Salad', calories: 280, protein: 26, tags: ['keto'], prepTime: 15, cookTime: 20 }
    ],
    balanced: [
      { name: 'Sambar Rice with Poriyal', calories: 420, protein: 12, tags: ['south_indian', 'vegetarian'], prepTime: 25, cookTime: 30 },
      { name: 'Malabar Biryani', calories: 550, protein: 18, tags: ['kerala'], prepTime: 30, cookTime: 45 },
      { name: 'Rajma Chawal', calories: 440, protein: 16, tags: ['north_indian', 'vegetarian'], prepTime: 20, cookTime: 30 },
      { name: 'Lucknowi Biryani', calories: 580, protein: 22, tags: ['north_indian'], prepTime: 30, cookTime: 45 },
      { name: 'Vegetable Thali', calories: 500, protein: 15, tags: ['north_indian', 'vegetarian'], prepTime: 30, cookTime: 35 },
      { name: 'Pav Bhaji', calories: 450, protein: 12, tags: ['maharashtrian', 'vegetarian'], prepTime: 20, cookTime: 25 }
    ]
  },
  dinner: {
    high_protein: [
      { name: 'Mysore Mutton Curry with Ragi Roti', calories: 450, protein: 32, tags: ['south_indian'], prepTime: 30, cookTime: 45 },
      { name: 'Andhra Egg Curry with Quinoa', calories: 380, protein: 24, tags: ['south_indian'], prepTime: 20, cookTime: 30 },
      { name: 'Amritsari Fish with Mint Chutney', calories: 420, protein: 34, tags: ['north_indian'], prepTime: 25, cookTime: 30 },
      { name: 'Dhaba Style Chicken Curry', calories: 460, protein: 36, tags: ['north_indian'], prepTime: 25, cookTime: 35 },
      { name: 'Paneer Bhurji with Roti', calories: 400, protein: 24, tags: ['north_indian', 'vegetarian'], prepTime: 15, cookTime: 20 },
      { name: 'Lamb Keema with Whole Wheat Pita', calories: 480, protein: 30, tags: ['fusion'], prepTime: 25, cookTime: 30 },
      { name: 'Grilled Salmon with Asparagus', calories: 410, protein: 35, tags: ['fusion'], prepTime: 15, cookTime: 20 },
      { name: 'Chicken Tikka Masala with Brown Rice', calories: 420, protein: 38, tags: ['north_indian'], prepTime: 25, cookTime: 35 }
    ],
    low_carb: [
      { name: 'Keto Chicken Chettinad', calories: 320, protein: 28, tags: ['south_indian', 'keto'], prepTime: 25, cookTime: 30 },
      { name: 'Cauliflower Rice Vangi Bath', calories: 260, protein: 10, tags: ['south_indian', 'keto', 'vegetarian'], prepTime: 20, cookTime: 25 },
      { name: 'Keto Malai Tikka', calories: 300, protein: 26, tags: ['north_indian', 'keto'], prepTime: 20, cookTime: 25 },
      { name: 'Tandoori Cauliflower', calories: 180, protein: 8, tags: ['north_indian', 'keto', 'vegetarian'], prepTime: 15, cookTime: 25 },
      { name: 'Grilled Fish with Steamed Vegetables', calories: 320, protein: 28, tags: ['keto'], prepTime: 15, cookTime: 20 },
      { name: 'Stuffed Bell Peppers', calories: 240, protein: 12, tags: ['fusion', 'keto', 'vegetarian'], prepTime: 20, cookTime: 25 },
      { name: 'Zucchini and Chicken Stir Fry', calories: 280, protein: 25, tags: ['keto'], prepTime: 15, cookTime: 20 }
    ],
    balanced: [
      { name: 'Curd Rice with Pickle', calories: 320, protein: 10, tags: ['south_indian', 'vegetarian'], prepTime: 10, cookTime: 15 },
      { name: 'Kerala Parotta with Beef Fry', calories: 580, protein: 24, tags: ['kerala'], prepTime: 25, cookTime: 30 },
      { name: 'Dal Tadka with Jeera Rice', calories: 420, protein: 14, tags: ['north_indian', 'vegetarian'], prepTime: 20, cookTime: 25 },
      { name: 'Butter Naan with Paneer Makhani', calories: 550, protein: 18, tags: ['north_indian', 'vegetarian'], prepTime: 25, cookTime: 30 },
      { name: 'Vegetable Korma with Pulao', calories: 450, protein: 12, tags: ['south_indian', 'vegetarian'], prepTime: 25, cookTime: 30 },
      { name: 'Chicken Biryani', calories: 520, protein: 28, tags: ['north_indian'], prepTime: 30, cookTime: 45 },
      { name: 'Chana Masala with Rice', calories: 400, protein: 15, tags: ['north_indian', 'vegetarian'], prepTime: 20, cookTime: 25 }
    ]
  }
};

// Helper functions
export const getMealsByDietType = (mealTime: keyof MealPlan, dietType: keyof MealCategory): Meal[] => {
  return MEALS[mealTime][dietType];
};

export const getMealsByTag = (tag: string): Meal[] => {
  const allMeals: Meal[] = [];
  Object.values(MEALS).forEach(mealTime => {
    Object.values(mealTime).forEach(dietType => {
      dietType.forEach(meal => {
        if (meal.tags.includes(tag)) {
          allMeals.push(meal);
        }
      });
    });
  });
  return allMeals;
};

export const getVegetarianMeals = (): Meal[] => {
  return getMealsByTag('vegetarian');
};

export const getKetoMeals = (): Meal[] => {
  return getMealsByTag('keto');
};

export const getMealsByCuisine = (cuisine: string): Meal[] => {
  return getMealsByTag(cuisine);
};

export const calculateMealNutrition = (meals: Meal[]): { totalCalories: number; totalProtein: number } => {
  return meals.reduce(
    (acc, meal) => ({
      totalCalories: acc.totalCalories + meal.calories,
      totalProtein: acc.totalProtein + meal.protein,
    }),
    { totalCalories: 0, totalProtein: 0 }
  );
};

export const activityLevels = [
  { value: 'sedentary', label: 'Sedentary (little or no exercise)', multiplier: 1.2 },
  { value: 'light', label: 'Lightly Active (light exercise 1-3 days/week)', multiplier: 1.375 },
  { value: 'moderate', label: 'Moderately Active (moderate exercise 3-5 days/week)', multiplier: 1.55 },
  { value: 'very', label: 'Very Active (hard exercise 6-7 days/week)', multiplier: 1.725 },
  { value: 'extra', label: 'Extra Active (very hard exercise & physical job)', multiplier: 1.9 }
] as const;

export const dietaryTypes = CUISINE_TAGS.filter(tag => ['vegetarian', 'keto'].includes(tag));
export const cuisineTypes = CUISINE_TAGS.filter(tag => !['vegetarian', 'keto'].includes(tag));
export const healthGoals = ['Weight Loss', 'Muscle Gain', 'Maintenance', 'Heart Health', 'Energy Boost', 'Better Sleep', 'Digestive Health', 'Athletic Performance'];
export const allergens = ['Dairy', 'Eggs', 'Fish', 'Shellfish', 'Tree Nuts', 'Peanuts', 'Wheat', 'Soy'];

// We don't have a sampleMealPlans in the current data structure, so let's create a simple one
export const sampleMealPlans = [
  {
    id: '1',
    name: 'Balanced Indian Diet',
    description: 'A well-balanced meal plan featuring a variety of Indian cuisines',
    targetCalories: 2000,
    macroSplit: {
      protein: 20,
      carbs: 55,
      fat: 25
    },
    weeklyPlan: Array(7).fill(MEALS)
  }
];

