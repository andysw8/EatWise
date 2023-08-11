import React, { useState } from 'react';
import { useMealPlanning } from '../Components/Context/MealPlanningContext';
import RecipeCard from '../Components/RecipeCard';
import '../Components/css/MealPlanning.css';

export default function MealPlanning() {
  const { mealPlan } = useMealPlanning();
  const [showShoppingList, setShowShoppingList] = useState(false);

  const totalCalories = mealPlan.reduce((total, recipe) => total + recipe.calories, 0);

  return (
    <div className="meal-planning">
      <h2>Meal Planning</h2>
      <div className="controls">
        <button onClick={() => setShowShoppingList(!showShoppingList)}>View Shopping List</button>
      </div>
      {showShoppingList && (
        <div className="shopping-list">
          <h3>Shopping List</h3>
          <ul>
            {mealPlan.flatMap((recipe) => recipe.ingredientLines).map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="total-calories-container"> 
        <p className="total-calories">Total Calories: {Math.round(totalCalories)}</p>
      </div>
      <div className="recipe-list">
        {mealPlan.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
