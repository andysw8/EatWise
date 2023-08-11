import React, { useState } from 'react';
import '../Components/css/LoginPage.css'

export default function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const dummyUser = [
      { email: 'test@example.com', password: 'hello123' },
    ];

    const matchingUser = dummyUser.find(
      user =>
        user.email === formData.email && user.password === formData.password
    );

    if (matchingUser) {
      onLogin(formData);
    } else {
      setError('Invalid email or password');
    }
  }

  return (
    <section className="login-page">
      <h1>Login</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit} action="">
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          type="text"
          name="email"
          id="email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
          required
        />

        <button type="submit">Login</button>
      </form>
    </section>
  );
}
