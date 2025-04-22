import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // För att navigera användaren

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulera inloggning genom att sätta en JWT-token i localStorage
    // I praktiken här skulle du göra en fetch-request till din backend för att verifiera användaren
    const fakeJwtToken = 'fake-jwt-token'; // Detta är mockat för nu
    localStorage.setItem('token', fakeJwtToken);

    // Efter inloggning, navigera till /rooms
    navigate('/rooms');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="border p-6 rounded shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4">Logga in</h2>
        <div className="mb-4">
          <label className="block mb-2">E-post</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border px-4 py-2 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Lösenord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border px-4 py-2 rounded w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Logga in
        </button>
      </form>
    </div>
  );
};

export default Login;
