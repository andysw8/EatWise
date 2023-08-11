import axios from 'axios';

const APP_ID = '805b197d';
const APP_KEY = '76f8891002dd147e9e28d9ce39a6e1a2';

export const fetchRecipes = async (query) => {
  try {
    const response = await axios.get('/api/edamam/api/recipes/v2', {
      params: {
        q: query,
        app_id: APP_ID,
        app_key: APP_KEY,
        type: 'public',
      },
    });
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};