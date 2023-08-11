import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import NavBar from './Components/NavBar';
import SearchForm from './Pages/SearchForm';
import MealPlanning from './Pages/MealPlanning';
import LoginPage from './Users/LoginPage';
import './App.css';
import { MealPlanningProvider } from './Components/Context/MealPlanningContext';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoggedIn(true)
    navigate('/meal-planning')
  };

  const handleLogout = () => {
    setLoggedIn(false)
    navigate('/')
  };

  return (
    <MealPlanningProvider>
      <div className="App">
        <NavBar loggedIn={loggedIn} onLogout={handleLogout} />
        <h1>EatWise</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchForm />} />
          <Route
            path="/meal-planning"
            element={
              loggedIn ? (
                <MealPlanning onLogout={handleLogout} />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
        </Routes>
      </div>
    </MealPlanningProvider>
  );
}

export default App;
