import React from 'react';
import { Link } from 'react-router-dom';
import './css/NavBar.css';

export default function NavBar({ loggedIn, onLogout }) {
  return (
    <nav className="navBar">
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/meal-planning" className="nav-link">
          Meal Planning
        </Link>
        <Link to="/search" className="nav-link">
          Search
        </Link>
        {loggedIn ? (
          <button className="nav-link" onClick={onLogout}>
            Logout
          </button>
        ) : (
          <Link to="/meal-planning" className="nav-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
