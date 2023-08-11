import React, { useState } from 'react';
import { useMealPlanning } from './Context/MealPlanningContext';
import './css/RecipeCard.css';

export default function RecipeCard({ recipe }) {
  const { mealPlan, addToMealPlan, removeFromMealPlan } = useMealPlanning();
  const [showMacronutrition, setShowMacronutrition] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);

  function isAdded() {
    return mealPlan.some(function(item) {
      return item.id === recipe.id;
    });
  }

  function handleToggleClick() {
    if (isAdded()) {
      removeFromMealPlan(recipe)
    } else {
      addToMealPlan(recipe)
    }
  }

  function toggleMacronutrition() {
    setShowMacronutrition(!showMacronutrition)
  }

  function toggleIngredients() {
    setShowIngredients(!showIngredients)
  }

  return (
    <div className="recipe-card">
      <h3 className="recipe-title">{recipe.label}</h3>
      <span className="calories-badge">{Math.round(recipe.calories)} cal</span>
      <img className="recipe-image" src={recipe.image} alt={recipe.label} />
      {showMacronutrition && (
        <div className="nutritional-info">
          <h4 className="info-title">Macronutrient Information:</h4>
          <ul className="info-list">
            <li>
              Carbohydrates: {recipe.totalNutrients.CHOCDF.quantity.toFixed(2)}{' '}
              {recipe.totalNutrients.CHOCDF.unit}
            </li>
            <li>
              Proteins: {recipe.totalNutrients.PROCNT.quantity.toFixed(2)}{' '}
              {recipe.totalNutrients.PROCNT.unit}
            </li>
            <li>
              Fats: {recipe.totalNutrients.FAT.quantity.toFixed(2)}{' '}
              {recipe.totalNutrients.FAT.unit}
            </li>
          </ul>
        </div>
      )}
      {showIngredients && (
        <div className="ingredient-list">
          <h4 className="info-title">Ingredients:</h4>
          <ul className="info-list">
            {recipe.ingredientLines.map(function(ingredient, index) {
              return <li key={index}>{ingredient}</li>
            })}
          </ul>
        </div>
      )}
      <div className="buttons">
        {isAdded() ? (
          <button className="remove-button" onClick={handleToggleClick}>
            Remove from Meal Plan
          </button>
        ) : (
          <button className="add-button" onClick={handleToggleClick}>
            Add to Meal Plan
          </button>
        )}
        <button className="macronutrition-button" onClick={toggleMacronutrition}>
          {showMacronutrition ? 'Hide Macronutrition' : 'Show Macronutrition'}
        </button>
        <button className="ingredients-button" onClick={toggleIngredients}>
          {showIngredients ? 'Hide Ingredients' : 'Show Ingredients'}
        </button>
      </div>
      <a className="recipe-link" href={recipe.url} target="_blank" rel="noopener noreferrer">
        Link to Recipe
      </a>
    </div>
  )
}
