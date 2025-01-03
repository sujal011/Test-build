// 'use client'

// import { useAuth } from '../contexts/AuthContext'
// import { useRouter } from 'next/navigation'
// import { useEffect } from 'react'
// import Navbar from '../components/Navbar'

// export default function MealPlannerPage() {
//   const { user } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     if (!user) {
//       router.push('/auth/login')
//     }
//   }, [user, router])

//   if (!user) {
//     return null // or a loading spinner
//   }

//   return (
//     <div className="min-h-screen bg-cooking">
//       <Navbar />
//       <div className="min-h-screen bg-black/50 p-8 pt-24"> {/* Added pt-24 for navbar space */}
//         <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
//           <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
//             Meal Planner
//           </h1>
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <p className="text-gray-600 text-center mb-8">
//               Plan your weekly meals with our intelligent meal planning system. Get personalized recommendations and nutritional insights.
//             </p>
//             {/* Meal planner functionality will be added here */}
//             <div className="text-center text-gray-500">
//               Coming soon...
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// 'use client';

// import { useState, useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { useRouter } from 'next/navigation';
// import Navbar from '../components/Navbar';
// import Chart from 'chart.js/auto';

// export default function MealPlannerPage() {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [mealPlan, setMealPlan] = useState(null);
//   const [nutritionData, setNutritionData] = useState(null);
//   const [formData, setFormData] = useState({
//     height: '',
//     weight: '',
//     avoid: '',
//     goals: '',
//     gender: '',
//     cuisine: ''
//   });

//   useEffect(() => {
//     if (!user) {
//       router.push('/auth/login');
//     }
//   }, [user, router]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const fetchMealPlan = async () => {
//     try {
//       const response = await fetch('/api/mealPlan', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();
//       setMealPlan(data.meals);
//       setNutritionData(data.nutrition);
//       generatePieChart(data.nutrition);
//     } catch (error) {
//       console.error('Error fetching meal plan:', error);
//     }
//   };

//   const generatePieChart = (nutrition) => {
//     const ctx = document.getElementById('nutritionChart').getContext('2d');
//     new Chart(ctx, {
//       type: 'pie',
//       data: {
//         labels: ['Carbs', 'Protein', 'Fat'],
//         datasets: [
//           {
//             data: [nutrition.carbs, nutrition.protein, nutrition.fat],
//             backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
//           }
//         ]
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: { position: 'top' }
//         }
//       }
//     });
//   };

//   if (!user) {
//     return null; // or a loading spinner
//   }

//   return (
//     <div className="min-h-screen bg-cooking">
//       <Navbar />
//       <div className="min-h-screen bg-black/50 p-8 pt-24">
//         <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
//           <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
//             Meal Planner
//           </h1>
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <p className="text-gray-600 text-center mb-8">
//               Plan your weekly meals with our intelligent meal planning system. Get personalized recommendations and nutritional insights.
//             </p>
//             <div className="mb-8">
//               {/* User Input Form */}
//               <label className="block mb-4">
//                 Height (cm):
//                 <input
//                   type="number"
//                   name="height"
//                   value={formData.height}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </label>
//               <label className="block mb-4">
//                 Weight (kg):
//                 <input
//                   type="number"
//                   name="weight"
//                   value={formData.weight}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </label>
//               <label className="block mb-4">
//                 Avoid (e.g., nuts, dairy):
//                 <input
//                   type="text"
//                   name="avoid"
//                   value={formData.avoid}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </label>
//               <label className="block mb-4">
//                 Personal Goals (e.g., weight loss, muscle gain):
//                 <input
//                   type="text"
//                   name="goals"
//                   value={formData.goals}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </label>
//               <label className="block mb-4">
//                 Gender:
//                 <select
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded"
//                 >
//                   <option value="">Select</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                 </select>
//               </label>
//               <label className="block mb-4">
//                 Cuisine Preference:
//                 <input
//                   type="text"
//                   name="cuisine"
//                   value={formData.cuisine}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </label>
//               <button
//                 onClick={fetchMealPlan}
//                 className="bg-green-700 text-white px-4 py-2 rounded"
//               >
//                 Generate Meal Plan
//               </button>
//             </div>
//             {/* Meal Plan Display */}
//             {mealPlan && (
//               <div>
//                 <h2 className="text-2xl font-bold mb-4">Your Meal Plan:</h2>
//                 <ul>
//                   {mealPlan.map((meal, index) => (
//                     <li key={index} className="mb-2">
//                       {meal.title} - {meal.calories} Calories
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             {/* Nutrition Pie Chart */}
//             {nutritionData && (
//               <div className="mt-8">
//                 <h2 className="text-2xl font-bold mb-4">Nutrition Breakdown:</h2>
//                 <canvas id="nutritionChart" width="400" height="400"></canvas>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



//WORKING
'use client'

import React, { useState, useEffect } from 'react';

import { useAuth } from '../contexts/AuthContext'
// import { useRouter } from 'next/navigation'
import { useRouter } from 'next/navigation';
 import Navbar from '../components/Navbar'
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

// Rest of the component remains the same...

const MealPlannerPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    gender: '',
    avoidances: '',
    goals: '',
    cuisineType: '',
  });
  const [mealPlan, setMealPlan] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would make API calls to Spoonacular and Groq
    // For demo, setting sample data
    setMealPlan({
      monday: { breakfast: "Oatmeal with berries", lunch: "Quinoa salad", dinner: "Grilled salmon" },
      tuesday: { breakfast: "Greek yogurt parfait", lunch: "Turkey wrap", dinner: "Chicken stir-fry" },
      // ... other days
    });

    setNutritionData([
      { name: 'Protein', value: 30 },
      { name: 'Carbs', value: 45 },
      { name: 'Fats', value: 25 }
    ]);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="min-h-screen bg-cooking">
      <Navbar />
      <div className="min-h-screen bg-black/50 p-8 pt-24">
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
            Meal Planner
          </h1>

          <Card className="mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Height (cm)"
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({...formData, height: e.target.value})}
                  />
                  <Input
                    placeholder="Weight (kg)"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({...formData, weight: e.target.value})}
                  />
                  <select 
                    className="p-2 border rounded"
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <select
                    className="p-2 border rounded"
                    value={formData.cuisineType}
                    onChange={(e) => setFormData({...formData, cuisineType: e.target.value})}
                  >
                    <option value="">Select Cuisine Type</option>
                    <option value="italian">Italian</option>
                    <option value="asian">Asian</option>
                    <option value="mediterranean">Mediterranean</option>
                  </select>
                  <Input
                    placeholder="Food Avoidances (comma-separated)"
                    value={formData.avoidances}
                    onChange={(e) => setFormData({...formData, avoidances: e.target.value})}
                  />
                  <select
                    className="p-2 border rounded"
                    value={formData.goals}
                    onChange={(e) => setFormData({...formData, goals: e.target.value})}
                  >
                    <option value="">Select Goal</option>
                    <option value="weightLoss">Weight Loss</option>
                    <option value="muscle">Muscle Gain</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
                <Button type="submit" className="w-full">
                  Generate Meal Plan
                </Button>
              </form>
            </CardContent>
          </Card>

          {mealPlan && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">7-Day Meal Plan</h2>
                  {Object.entries(mealPlan).map(([day, meals]) => (
                    <div key={day} className="mb-4">
                      <h3 className="font-semibold capitalize">{day}</h3>
                      <ul className="list-disc pl-5">
                        {Object.entries(meals).map(([meal, food]) => (
                          <li key={meal} className="capitalize">
                            {meal}: {food}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Nutritional Breakdown</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={nutritionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {nutritionData?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPlannerPage;



'use client'

import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Navbar from '../components/Navbar'
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Plus, Minus } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const MealPlannerPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    gender: '',
    activityLevel: '',
    fitnessGoal: '',
    dietaryRestrictions: '',
    cuisine: '',
    spicePreference: 'mild'
  });

  const [mealPlan, setMealPlan] = useState(null);
  const [nutritionData, setNutritionData] = useState([
    { name: 'Carbs', value: 40, color: '#FFB84C' },
    { name: 'Protein', value: 21, color: '#A084DC' },
    { name: 'Fat', value: 39, color: '#16B3AC' }
  ]);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  if (!user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Debugging: Log form data

    // Fetch meal plan from Spoonacular API
    const apiUrl = `https://api.spoonacular.com/mealplanner/generate?apiKey=9c0219f8708845cc9800691ac5e75194&diet=${formData.dietaryRestrictions}&cuisine=${formData.cuisine}&targetCalories=2000`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('Meal Plan Response:', data); // Debugging: Log response

      if (data && data.meals) {
        setMealPlan({
          monday: data.meals[0],
          tuesday: data.meals[1],
          // Add more days as needed
        });
      } else {
        console.error('No meal data found:', data);
        alert('Error fetching meal plan.');
      }

      // Fetch nutritional information from Groq API (or a similar service)
      const nutritionApiUrl = `https://api.groq.com/mealNutrition?apiKey=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&mealId=${data.meals[0].id}`;
      const nutritionResponse = await fetch(nutritionApiUrl);
      const nutritionData = await nutritionResponse.json();
      console.log('Nutrition Data Response:', nutritionData); // Debugging: Log nutrition response

      if (nutritionData) {
        setNutritionData([
          { name: 'Protein', value: nutritionData.protein, color: '#16B3AC' },
          { name: 'Carbs', value: nutritionData.carbs, color: '#FFB84C' },
          { name: 'Fat', value: nutritionData.fat, color: '#A084DC' }
        ]);
      } else {
        console.error('No nutrition data found:', nutritionData);
        alert('Error fetching nutrition data.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Something went wrong while fetching data.');
    }
  };

  return (
    <div className="min-h-screen bg-cooking">
      <Navbar />
      <div className="min-h-screen bg-black/50 p-8 pt-24">
        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
            Meal Planner
          </h1>

          <Card className="mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Height (cm)"
                      type="number"
                      value={formData.height}
                      onChange={(e) => setFormData({...formData, height: e.target.value})}
                    />
                    <Input
                      placeholder="Weight (kg)"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: e.target.value})}
                    />
                  </div>

                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData({...formData, gender: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={formData.activityLevel}
                    onValueChange={(value) => setFormData({...formData, activityLevel: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Activity Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="light">Light Active</SelectItem>
                      <SelectItem value="moderate">Moderately Active</SelectItem>
                      <SelectItem value="very">Very Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Goals & Preferences */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Goals & Preferences</h2>
                  <Select
                    value={formData.fitnessGoal}
                    onValueChange={(value) => setFormData({...formData, fitnessGoal: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Fitness Goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weightLoss">Weight Loss</SelectItem>
                      <SelectItem value="muscle">Muscle Gain</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={formData.dietaryRestrictions}
                    onValueChange={(value) => setFormData({...formData, dietaryRestrictions: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Dietary Restrictions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="glutenFree">Gluten Free</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Regional Preferences */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Regional Preferences</h2>
                  <Select
                    value={formData.cuisine}
                    onValueChange={(value) => setFormData({...formData, cuisine: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Preferred Cuisine" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="italian">Italian</SelectItem>
                      <SelectItem value="asian">Asian</SelectItem>
                      <SelectItem value="mediterranean">Mediterranean</SelectItem>
                      <SelectItem value="indian">Indian</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Spice Preference</label>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Mild</span>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={formData.spicePreference}
                        onChange={(e) => setFormData({...formData, spicePreference: e.target.value})}
                        className="flex-1"
                      />
                      <span className="text-sm">Very Spicy</span>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-green-500 to-green-700">
                  Generate Meal Plan
                </Button>
              </form>
            </CardContent>
          </Card>

          {mealPlan && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Meal Plan Display */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Your 7-Day Meal Plan</h2>
                  {/* Meal plan content */}
                </CardContent>
              </Card>

              {/* Nutrition Chart */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Nutritional Breakdown</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={nutritionData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label
                      >
                        {nutritionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPlannerPage;

