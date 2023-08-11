import React from 'react';
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { MealPlanningProvider } from './Components/Context/MealPlanningContext'; 
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Router>
      <MealPlanningProvider> 
        <App />
      </MealPlanningProvider>
    </Router>
 
);
