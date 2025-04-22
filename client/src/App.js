import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import LoginForm from './loginForm';
import Rooms from './rooms';
const Home = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Välkommen till Coworking Space!</h2>
      <p className="mb-4">Välj ett alternativ för att komma igång:</p>
      
      <div className="space-y-4">
        <Link to="/login">
          <button className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Logga in
          </button>
        </Link>
        
        <Link to="/register">
          <button className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            Registrera dig
          </button>
        </Link>
      </div>
    </div>
  </div>
);

const Register = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <h2 className="text-3xl font-bold">Registrera dig</h2>
      {/* Här kan du lägga till formulär för registrering */}
    </div>
  </div>
);

const Login = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-center">
      <LoginForm />
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rooms" element={<Rooms />} />
      </Routes>
    </Router>
  );
};

export default App;
