import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Förhindrar att sidan laddas om vid form-inlämning

    const userData = { email, password };

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Felaktig inloggning');
      }

      const data = await response.json();
      // Om inloggningen lyckas, spara JWT-token i localStorage eller gör något annat
      localStorage.setItem('jwt', data.token); // Exempel på att spara token

      // Gå till annan sida efter inloggning, t.ex. dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message); // Visa eventuellt felmeddelande
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-8 border rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Logga in</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold">
              E-post
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold">
              Lösenord
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Logga in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
