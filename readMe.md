## Project Backend

This project is based on my school assignment in backend development course.
The purpose of my project is to create a database for a coworking space.
And with an API, manage users and their roles along with manage rooms and bookings.
It focuses on role-based action control (RBAC) using specific privileges for "Admin" and "User".
The project also features caching and websockets.
The APIs can be tested with the program Postman.

---

## Features

- Authentication using JWT
- Role-based access control (User/Admin)
- Room management (CRUD)
- Book & delete bookings
- Automatic cache invalidation
- Real-time updates with Socket.io

---

## Technologies Used

- Node.js – Backend runtime
- Express – Web framework
- TypeScript – Strong typing
- MongoDB – Database
- Mongoose – ODM (Object Data Modeling)
- bcryptjs – Password hashing
- JWT – Authentication system
- Socket.io – Real-time communication
- dotenv – Environment variable management
- Postman / Thunder Client – Testing tools for API
- Winston – Logging
- Redis – Caching
- Docker – Containerization for running Redis and the app

---

## Project Structure

📁 src  
  📁 controllers  
  📁 services  
  📁 models  
  📁 routes  
  📁 middleware  
  📁 utils  
  📄 app.ts  
  📄 server.ts  

---

## Getting Started

### 1. Clone the repo

git clone  https://github.com/AtombombsKatt/Coworkingspace---Backend.git
cd your-repo

### 2. Install dependacies
 npm install

### 3. Create .env file
PORT=5000
MONGO_URI=your-mongodb-url
JWT_SECRET=your-secret-key

### 4. Run the app
npm run dev

### 5. API endpoints

  Register User
POST /api/auth/register
Body:


{
  "username": "user1",
  "password": "password123",
  "role": "user"
}


   Login User
POST /api/auth/login
Body:

{
  "username": "user1",
  "password": "password123"
}
