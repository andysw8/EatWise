import React, { createContext, useContext, useState } from 'react';

const MealPlanningContext = createContext();

export function MealPlanningProvider({ children }) {
  const [mealPlan, setMealPlan] = useState([])
  const [daysMapping, setDaysMapping] = useState({})

  const addToMealPlan = (recipe) => {
    const newRecipe = { ...recipe, id: Date.now() }; // Assign a unique id
    setMealPlan((prevMealPlan) => [...prevMealPlan, newRecipe])
  };

  const removeFromMealPlan = (recipe) => {
    setMealPlan((prevMealPlan) => prevMealPlan.filter((item) => item.id !== recipe.id))
  };

  return (
    <MealPlanningContext.Provider
      value={{ mealPlan, daysMapping, addToMealPlan, removeFromMealPlan }}
    >
      {children}
    </MealPlanningContext.Provider>
  )
}

export function useMealPlanning() {
  return useContext(MealPlanningContext)
}
