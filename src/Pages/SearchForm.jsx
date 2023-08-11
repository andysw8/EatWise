import React, { useState } from 'react';
import axios from 'axios';
import RecipeCard from '../Components/RecipeCard';
import { useMealPlanning } from '../Components/Context/MealPlanningContext';
import '../Components/css/SearchForm.css';

export default function SearchForm() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { addToMealPlan, assignRecipeToDay, daysMapping } = useMealPlanning();

  async function handleSearch(event) {
    event.preventDefault();
    try {
      const response = await axios.get('/api/edamam/api/recipes/v2', {
        params: {
          q: query,
          app_id: '805b197d',
          app_key: '76f8891002dd147e9e28d9ce39a6e1a2',
          type: 'public',
        },
      });
      setSearchResults(response.data.hits);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }

  return (
    <div className="search-container">
      <h2 className="search-title">Meal Search</h2>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter an ingredient..."
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {searchResults.length > 0 && (
        <div className="search-results">
          <h3 className="results-title">Search Results for "{query}"</h3>
          <ul className="results-list">
            {searchResults.map((result, index) => (
              <li className="results-item" key={index}>
                <RecipeCard
                  recipe={result.recipe}
                  onAddToMealPlan={addToMealPlan}
                  onAssignToDay={(recipeId, selectedDay) =>
                    assignRecipeToDay(recipeId, selectedDay)
                  }
                  isAssigned={daysMapping[result.recipe.id] !== undefined}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
