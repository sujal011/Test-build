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
// 'use client'

// import React, { useState, useEffect } from 'react';

// import { useAuth } from '../contexts/AuthContext'
// // import { useRouter } from 'next/navigation'
// import { useRouter } from 'next/navigation';
//  import Navbar from '../components/Navbar'
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Select } from '@/components/ui/select';
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

// // Rest of the component remains the same...

// const MealPlannerPage = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     height: '',
//     weight: '',
//     gender: '',
//     avoidances: '',
//     goals: '',
//     cuisineType: '',
//   });
//   const [mealPlan, setMealPlan] = useState(null);
//   const [nutritionData, setNutritionData] = useState(null);

//   useEffect(() => {
//     if (!user) {
//       router.push('/auth/login');
//     }
//   }, [user, router]);

//   if (!user) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Here you would make API calls to Spoonacular and Groq
//     // For demo, setting sample data
//     setMealPlan({
//       monday: { breakfast: "Oatmeal with berries", lunch: "Quinoa salad", dinner: "Grilled salmon" },
//       tuesday: { breakfast: "Greek yogurt parfait", lunch: "Turkey wrap", dinner: "Chicken stir-fry" },
//       // ... other days
//     });

//     setNutritionData([
//       { name: 'Protein', value: 30 },
//       { name: 'Carbs', value: 45 },
//       { name: 'Fats', value: 25 }
//     ]);
//   };

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

//   return (
//     <div className="min-h-screen bg-cooking">
//       <Navbar />
//       <div className="min-h-screen bg-black/50 p-8 pt-24">
//         <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
//           <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
//             Meal Planner
//           </h1>

//           <Card className="mb-8">
//             <CardContent className="p-6">
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <Input
//                     placeholder="Height (cm)"
//                     type="number"
//                     value={formData.height}
//                     onChange={(e) => setFormData({...formData, height: e.target.value})}
//                   />
//                   <Input
//                     placeholder="Weight (kg)"
//                     type="number"
//                     value={formData.weight}
//                     onChange={(e) => setFormData({...formData, weight: e.target.value})}
//                   />
//                   <select 
//                     className="p-2 border rounded"
//                     value={formData.gender}
//                     onChange={(e) => setFormData({...formData, gender: e.target.value})}
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//                   <select
//                     className="p-2 border rounded"
//                     value={formData.cuisineType}
//                     onChange={(e) => setFormData({...formData, cuisineType: e.target.value})}
//                   >
//                     <option value="">Select Cuisine Type</option>
//                     <option value="italian">Italian</option>
//                     <option value="asian">Asian</option>
//                     <option value="mediterranean">Mediterranean</option>
//                   </select>
//                   <Input
//                     placeholder="Food Avoidances (comma-separated)"
//                     value={formData.avoidances}
//                     onChange={(e) => setFormData({...formData, avoidances: e.target.value})}
//                   />
//                   <select
//                     className="p-2 border rounded"
//                     value={formData.goals}
//                     onChange={(e) => setFormData({...formData, goals: e.target.value})}
//                   >
//                     <option value="">Select Goal</option>
//                     <option value="weightLoss">Weight Loss</option>
//                     <option value="muscle">Muscle Gain</option>
//                     <option value="maintenance">Maintenance</option>
//                   </select>
//                 </div>
//                 <Button type="submit" className="w-full">
//                   Generate Meal Plan
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>

//           {mealPlan && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <Card>
//                 <CardContent className="p-6">
//                   <h2 className="text-xl font-bold mb-4">7-Day Meal Plan</h2>
//                   {Object.entries(mealPlan).map(([day, meals]) => (
//                     <div key={day} className="mb-4">
//                       <h3 className="font-semibold capitalize">{day}</h3>
//                       <ul className="list-disc pl-5">
//                         {Object.entries(meals).map(([meal, food]) => (
//                           <li key={meal} className="capitalize">
//                             {meal}: {food}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardContent className="p-6">
//                   <h2 className="text-xl font-bold mb-4">Nutritional Breakdown</h2>
//                   <div className="h-64">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie
//                           data={nutritionData}
//                           cx="50%"
//                           cy="50%"
//                           labelLine={false}
//                           label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                           outerRadius={80}
//                           fill="#8884d8"
//                           dataKey="value"
//                         >
//                           {nutritionData?.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                           ))}
//                         </Pie>
//                         <Legend />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MealPlannerPage;



// 'use client'

// import { useAuth } from '../contexts/AuthContext'
// import { useRouter } from 'next/navigation'
// import Navbar from '../components/Navbar'
// import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
// import { Plus, Minus } from 'lucide-react';
// import React, { useState, useEffect } from 'react';

// const MealPlannerPage = () => {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     height: '',
//     weight: '',
//     gender: '',
//     activityLevel: '',
//     fitnessGoal: '',
//     dietaryRestrictions: '',
//     cuisine: '',
//     spicePreference: 'mild'
//   });

//   const [mealPlan, setMealPlan] = useState(null);
//   const [nutritionData, setNutritionData] = useState([
//     { name: 'Carbs', value: 40, color: '#FFB84C' },
//     { name: 'Protein', value: 21, color: '#A084DC' },
//     { name: 'Fat', value: 39, color: '#16B3AC' }
//   ]);

//   useEffect(() => {
//     if (!user) {
//       router.push('/auth/login');
//     }
//   }, [user, router]);

//   if (!user) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Form Data:', formData); // Debugging: Log form data

//     // Fetch meal plan from Spoonacular API
//     const apiUrl = `https://api.spoonacular.com/mealplanner/generate?apiKey=9c0219f8708845cc9800691ac5e75194&diet=${formData.dietaryRestrictions}&cuisine=${formData.cuisine}&targetCalories=2000`;

//     try {
//       const response = await fetch(apiUrl);
//       const data = await response.json();
//       console.log('Meal Plan Response:', data); // Debugging: Log response

//       if (data && data.meals) {
//         setMealPlan({
//           monday: data.meals[0],
//           tuesday: data.meals[1],
//           // Add more days as needed
//         });
//       } else {
//         console.error('No meal data found:', data);
//         alert('Error fetching meal plan.');
//       }

//       // Fetch nutritional information from Groq API (or a similar service)
//       const nutritionApiUrl = `https://api.groq.com/mealNutrition?apiKey=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&mealId=${data.meals[0].id}`;
//       const nutritionResponse = await fetch(nutritionApiUrl);
//       const nutritionData = await nutritionResponse.json();
//       console.log('Nutrition Data Response:', nutritionData); // Debugging: Log nutrition response

//       if (nutritionData) {
//         setNutritionData([
//           { name: 'Protein', value: nutritionData.protein, color: '#16B3AC' },
//           { name: 'Carbs', value: nutritionData.carbs, color: '#FFB84C' },
//           { name: 'Fat', value: nutritionData.fat, color: '#A084DC' }
//         ]);
//       } else {
//         console.error('No nutrition data found:', nutritionData);
//         alert('Error fetching nutrition data.');
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       alert('Something went wrong while fetching data.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-cooking">
//       <Navbar />
//       <div className="min-h-screen bg-black/50 p-8 pt-24">
//         <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
//           <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
//             Meal Planner
//           </h1>

//           <Card className="mb-8">
//             <CardContent className="p-6">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Personal Information */}
//                 <div className="space-y-4">
//                   <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
//                   <div className="grid grid-cols-2 gap-4">
//                     <Input
//                       placeholder="Height (cm)"
//                       type="number"
//                       value={formData.height}
//                       onChange={(e) => setFormData({...formData, height: e.target.value})}
//                     />
//                     <Input
//                       placeholder="Weight (kg)"
//                       type="number"
//                       value={formData.weight}
//                       onChange={(e) => setFormData({...formData, weight: e.target.value})}
//                     />
//                   </div>

//                   <Select
//                     value={formData.gender}
//                     onValueChange={(value) => setFormData({...formData, gender: value})}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select Gender" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="male">Male</SelectItem>
//                       <SelectItem value="female">Female</SelectItem>
//                       <SelectItem value="other">Other</SelectItem>
//                     </SelectContent>
//                   </Select>

//                   <Select
//                     value={formData.activityLevel}
//                     onValueChange={(value) => setFormData({...formData, activityLevel: value})}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Activity Level" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="sedentary">Sedentary</SelectItem>
//                       <SelectItem value="light">Light Active</SelectItem>
//                       <SelectItem value="moderate">Moderately Active</SelectItem>
//                       <SelectItem value="very">Very Active</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Goals & Preferences */}
//                 <div className="space-y-4">
//                   <h2 className="text-xl font-semibold mb-4">Goals & Preferences</h2>
//                   <Select
//                     value={formData.fitnessGoal}
//                     onValueChange={(value) => setFormData({...formData, fitnessGoal: value})}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Fitness Goal" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="weightLoss">Weight Loss</SelectItem>
//                       <SelectItem value="muscle">Muscle Gain</SelectItem>
//                       <SelectItem value="maintenance">Maintenance</SelectItem>
//                     </SelectContent>
//                   </Select>

//                   <Select
//                     value={formData.dietaryRestrictions}
//                     onValueChange={(value) => setFormData({...formData, dietaryRestrictions: value})}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Dietary Restrictions" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="none">None</SelectItem>
//                       <SelectItem value="vegetarian">Vegetarian</SelectItem>
//                       <SelectItem value="vegan">Vegan</SelectItem>
//                       <SelectItem value="glutenFree">Gluten Free</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Regional Preferences */}
//                 <div className="space-y-4">
//                   <h2 className="text-xl font-semibold mb-4">Regional Preferences</h2>
//                   <Select
//                     value={formData.cuisine}
//                     onValueChange={(value) => setFormData({...formData, cuisine: value})}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Preferred Cuisine" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="italian">Italian</SelectItem>
//                       <SelectItem value="asian">Asian</SelectItem>
//                       <SelectItem value="mediterranean">Mediterranean</SelectItem>
//                       <SelectItem value="indian">Indian</SelectItem>
//                     </SelectContent>
//                   </Select>

//                   <div className="space-y-2">
//                     <label className="block text-sm font-medium">Spice Preference</label>
//                     <div className="flex items-center space-x-2">
//                       <span className="text-sm">Mild</span>
//                       <input
//                         type="range"
//                         min="1"
//                         max="5"
//                         value={formData.spicePreference}
//                         onChange={(e) => setFormData({...formData, spicePreference: e.target.value})}
//                         className="flex-1"
//                       />
//                       <span className="text-sm">Very Spicy</span>
//                     </div>
//                   </div>
//                 </div>

//                 <Button type="submit" className="w-full bg-gradient-to-r from-green-500 to-green-700">
//                   Generate Meal Plan
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>

//           {mealPlan && (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               {/* Meal Plan Display */}
//               <Card>
//                 <CardContent className="p-6">
//                   <h2 className="text-xl font-semibold mb-4">Your 7-Day Meal Plan</h2>
//                   {/* Meal plan content */}
//                 </CardContent>
//               </Card>

//               {/* Nutrition Chart */}
//               <Card>
//                 <CardContent className="p-6">
//                   <h2 className="text-xl font-semibold mb-4">Nutritional Breakdown</h2>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <PieChart>
//                       <Pie
//                         data={nutritionData}
//                         dataKey="value"
//                         nameKey="name"
//                         cx="50%"
//                         cy="50%"
//                         outerRadius={100}
//                         fill="#8884d8"
//                         label
//                       >
//                         {nutritionData.map((entry, index) => (
//                           <Cell key={`cell-${index}`} fill={entry.color} />
//                         ))}
//                       </Pie>
//                       <Legend />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </CardContent>
//               </Card>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MealPlannerPage;

'use client'

import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { PieChart, Pie, Cell } from 'recharts';

const MealPlanner = () => {
  const [formData, setFormData] = useState({
    // Personal Info
    age: '',
    height: '',
    weight: '',
    gender: '',
    activityLevel: '',
    
    // Goals & Preferences
    fitnessGoal: '',
    dietaryRestrictions: '',
    
    // Regional Preferences
    cuisine: '',
    spiceLevel: ''
  });

  const [showResults, setShowResults] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);

  const activityMultipliers = {
    'Sedentary': 1.2,
    'Light Active': 1.375,
    'Moderately Active': 1.55,
    'Very Active': 1.725
  };

  const generateMealPlan = () => {
    // Calculate BMR
    let bmr;
    if (formData.gender === 'Male') {
      bmr = 10 * formData.weight + 6.25 * formData.height - 5 * formData.age + 5;
    } else {
      bmr = 10 * formData.weight + 6.25 * formData.height - 5 * formData.age - 161;
    }

    // Calculate TDEE
    const tdee = bmr * activityMultipliers[formData.activityLevel];

    // Adjust calories based on fitness goal
    let targetCalories;
    let macroRatios;

    switch(formData.fitnessGoal) {
      case 'Weight Loss':
        targetCalories = tdee * 0.8; // 20% deficit
        macroRatios = { protein: 40, fat: 30, carbs: 30 };
        break;
      case 'Muscle Gain':
        targetCalories = tdee * 1.1; // 10% surplus
        macroRatios = { protein: 35, fat: 25, carbs: 40 };
        break;
      case 'Maintenance':
        targetCalories = tdee;
        macroRatios = { protein: 30, fat: 30, carbs: 40 };
        break;
      default:
        targetCalories = tdee;
        macroRatios = { protein: 30, fat: 30, carbs: 40 };
    }

    // Calculate macros in grams
    const nutrition = {
      calories: Math.round(targetCalories),
      protein: Math.round((targetCalories * (macroRatios.protein / 100)) / 4),
      fat: Math.round((targetCalories * (macroRatios.fat / 100)) / 9),
      carbs: Math.round((targetCalories * (macroRatios.carbs / 100)) / 4)
    };

    // Generate sample meals based on preferences
    const mealPlanTemplate = {
      breakfast: {
        name: 'Customized Breakfast',
        calories: Math.round(targetCalories * 0.3),
        protein: Math.round(nutrition.protein * 0.3),
        carbs: Math.round(nutrition.carbs * 0.3),
        fat: Math.round(nutrition.fat * 0.3)
      },
      lunch: {
        name: 'Customized Lunch',
        calories: Math.round(targetCalories * 0.35),
        protein: Math.round(nutrition.protein * 0.35),
        carbs: Math.round(nutrition.carbs * 0.35),
        fat: Math.round(nutrition.fat * 0.35)
      },
      dinner: {
        name: 'Customized Dinner',
        calories: Math.round(targetCalories * 0.35),
        protein: Math.round(nutrition.protein * 0.35),
        carbs: Math.round(nutrition.carbs * 0.35),
        fat: Math.round(nutrition.fat * 0.35)
      }
    };

    setNutritionData(nutrition);
    setMealPlan(mealPlanTemplate);
    setShowResults(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateMealPlan();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Personal Information</h2>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Age</label>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2">Height (cm)</label>
              <Input
                type="number"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2">Weight (kg)</label>
              <Input
                type="number"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2">Gender</label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleInputChange('gender', value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </div>
            <div>
              <label className="block mb-2">Activity Level</label>
              <Select
                value={formData.activityLevel}
                onValueChange={(value) => handleInputChange('activityLevel', value)}
                required
              >
                <option value="">Select Activity Level</option>
                <option value="Sedentary">Sedentary</option>
                <option value="Light Active">Light Active</option>
                <option value="Moderately Active">Moderately Active</option>
                <option value="Very Active">Very Active</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Goals & Preferences */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Goals & Preferences</h2>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Fitness Goal</label>
              <Select
                value={formData.fitnessGoal}
                onValueChange={(value) => handleInputChange('fitnessGoal', value)}
                required
              >
                <option value="">Select Goal</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Muscle Gain">Muscle Gain</option>
                <option value="Maintenance">Maintenance</option>
              </Select>
            </div>
            <div>
              <label className="block mb-2">Dietary Restrictions</label>
              <Select
                value={formData.dietaryRestrictions}
                onValueChange={(value) => handleInputChange('dietaryRestrictions', value)}
                required
              >
                <option value="">None</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Gluten Free">Gluten Free</option>
              </Select>
            </div>
            <div>
              <label className="block mb-2">Preferred Cuisine</label>
              <Select
                value={formData.cuisine}
                onValueChange={(value) => handleInputChange('cuisine', value)}
                required
              >
                <option value="">Select Cuisine</option>
                <option value="Italian">Italian</option>
                <option value="Asian">Asian</option>
                <option value="Mediterranean">Mediterranean</option>
                <option value="Indian">Indian</option>
              </Select>
            </div>
            <div>
              <label className="block mb-2">Spice Preference</label>
              <Select
                value={formData.spiceLevel}
                onValueChange={(value) => handleInputChange('spiceLevel', value)}
                required
              >
                <option value="">Select Spice Level</option>
                <option value="Mild">Mild</option>
                <option value="Medium">Medium</option>
                <option value="Hot">Hot</option>
                <option value="Very Spicy">Very Spicy</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button type="submit" className="w-full max-w-md" size="lg">
            Generate Meal Plan
          </Button>
        </div>
      </form>

      {/* Results Section */}
      {showResults && nutritionData && (
        <div className="space-y-6">
          {/* Nutrition Overview */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Your Nutrition Overview</h2>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex justify-center">
                <PieChart width={200} height={200}>
                  <Pie
                    data={[
                      { name: 'Protein', value: nutritionData.protein * 4 },
                      { name: 'Fat', value: nutritionData.fat * 9 },
                      { name: 'Carbs', value: nutritionData.carbs * 4 }
                    ]}
                    cx={100}
                    cy={100}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#B878E8" />
                    <Cell fill="#26B8B8" />
                    <Cell fill="#F6C344" />
                  </Pie>
                </PieChart>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Daily Calories: {nutritionData.calories} kcal</p>
                  <p>Protein: {nutritionData.protein}g</p>
                  <p>Fat: {nutritionData.fat}g</p>
                  <p>Carbs: {nutritionData.carbs}g</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meal Plan */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Your Meal Plan</h2>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(mealPlan).map(([meal, details]) => (
                <div key={meal} className="border p-4 rounded-lg">
                  <h3 className="font-medium capitalize mb-2">{meal}</h3>
                  <p>{details.name}</p>
                  <p className="text-sm text-gray-600">
                    Calories: {details.calories}
                    <br />
                    Protein: {details.protein}g
                    <br />
                    Carbs: {details.carbs}g
                    <br />
                    Fat: {details.fat}g
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;