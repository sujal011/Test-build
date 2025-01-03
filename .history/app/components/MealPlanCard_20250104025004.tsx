import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Meal } from "../data/meal-plans"
import { motion } from "framer-motion"
import { Utensils } from 'lucide-react'

interface MealPlanCardProps {
  day: string;
  meals: {
    breakfast: Meal[];
    lunch: Meal[];
    dinner: Meal[];
  };
}

export function MealPlanCard({ day, meals }: MealPlanCardProps) {
  const totalCalories = Object.values(meals).flat().reduce((sum, meal) => sum + meal.calories, 0);
  const totalProtein = Object.values(meals).flat().reduce((sum, meal) => sum + meal.protein, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full bg-white/70 backdrop-blur-md shadow-lg hover:shadow-xl hover:bg-white/80 transition-all duration-300">
        <CardHeader className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-t-lg">
          <CardTitle className="flex justify-between items-center text-2xl font-bold">
            <span>{day}</span>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {totalCalories} kcal
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="text-center">
              <div className="font-semibold text-green-800">Total Protein</div>
              <div className="text-2xl font-bold text-green-600">{totalProtein}g</div>
            </div>

            <div className="space-y-4">
              {Object.entries(meals).map(([mealType, mealsList]) => (
                <div key={mealType} className="space-y-2">
                  <h4 className="font-semibold text-lg capitalize flex items-center">
                    <Utensils className="w-5 h-5 mr-2 text-primary" />
                    {mealType}
                  </h4>
                  {mealsList.map((meal, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 shadow-sm">
                      <div className="font-medium text-primary">{meal.name}</div>
                      <div className="text-sm text-gray-600">
                        {meal.calories} kcal | {meal.protein}g protein
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {meal.tags.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

