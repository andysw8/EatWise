import React, { useEffect, useState } from 'react'
import axios from 'axios'
import RecipeCard from '../Components/RecipeCard'
import '../Components/css/Home.css'

const APP_ID = '805b197d'
const APP_KEY = '76f8891002dd147e9e28d9ce39a6e1a2'

export default function Home() {
  const [recipes, setRecipes] = useState([])
  const limit = 10

  useEffect(() => {
    const getRandomRecipes = async () => {
      const randomQuery = getRandomIngredient()
      const response = await fetchRecipes(randomQuery)
      setRecipes(response.slice(0, limit))
    }

    getRandomRecipes()
  }, [])

  const getRandomIngredient = () => {
    const ingredients = [
      'chicken', 'beef', 'fish', 'tofu', 'soup', 'pasta', 'curry', 'ramen'
    ]
    const randomIndex = Math.floor(Math.random() * ingredients.length)
    return ingredients[randomIndex]
  }

  const fetchRecipes = async (query) => {
    try {
      const response = await axios.get('/api/edamam/api/recipes/v2', {
        params: {
          q: query,
          app_id: APP_ID,
          app_key: APP_KEY,
          type: 'public',
        },
      })
      return response.data.hits
    } catch (error) {
      console.error('Error fetching recipes:', error)
      return []
    }
  }

  return (
    <div className="home-container">
      <div className="recipe-grid">
        {recipes.map(({ recipe }) => (
          <RecipeCard key={recipe.uri} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}
