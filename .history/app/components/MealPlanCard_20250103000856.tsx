import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MealPlanCardProps {
  day: string;
  meals: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snack?: Meal;
  };
}

export function MealPlanCard({ day, meals }: MealPlanCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{day}</CardTitle>
      </CardHeader>
      <CardContent>
        {Object.entries(meals).map(([mealType, meal]) => (
          <div key={mealType} className="mb-4">
            <h3 className="font-semibold capitalize">{mealType}</h3>
            <p>{meal.name}</p>
            <p className="text-sm text-gray-500">
              Calories: {meal.calories} | P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

