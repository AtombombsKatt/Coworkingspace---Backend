import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Rooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Kontrollera om användaren är inloggad
    const token = localStorage.getItem('token');
    if (!token) {
      // Om ingen token finns, skicka användaren till login
      navigate('/');
    }

    // Simulera att hämta rum (i framtiden kan detta vara ett API-anrop)
    setRooms([
      { id: 1, name: "Rum A", description: "Ett bekvämt rum för arbete." },
      { id: 2, name: "Rum B", description: "Ett litet men mysigt rum." },
      { id: 3, name: "Rum C", description: "Stort rum med bra ljus." },
    ]);
  }, [navigate]);

  const handleBookRoom = (roomId) => {
    console.log(`Bokat rum med ID: ${roomId}`);
    // Här kan du senare skicka en API-anrop till backend för att boka rummet.
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tillgängliga Rum</h1>
      <div className="space-y-4">
        {rooms.map((room) => (
          <div key={room.id} className="border p-4 rounded shadow-lg">
            <h2 className="text-xl font-semibold">{room.name}</h2>
            <p>{room.description}</p>
            <button
              onClick={() => handleBookRoom(room.id)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Boka Rum
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
