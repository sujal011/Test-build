export interface PersonalDetails {
    age: number;
    gender: string;
    height: number;
    weight: number;
    activityLevel: string;
  }
  
  export interface HealthGoals {
    goals: string[];
  }
  
  export interface DietaryPreferences {
    dietTypes: string[];
    allergens: string[];
    spicePreference: number;
  }
  
  export interface MealPlanning {
    mealsPerDay: number;
    budget: string;
    cookingTime: string;
  }
  
  export interface MealPlannerFormData {
    personalDetails: PersonalDetails;
    healthGoals: HealthGoals;
    dietaryPreferences: DietaryPreferences;
    mealPlanning: MealPlanning;
  }
  
  