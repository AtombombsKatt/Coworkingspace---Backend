import dotenv from 'dotenv';
import http from 'http'; 
import { Server as SocketIOServer } from 'socket.io';
import app from './app';
import { connectToDatabase } from './config/dataBase';

dotenv.config();

const port = process.env.PORT || 5000;


const server = http.createServer(app);

//websocket
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  },
});


io.on('connection', (socket) => {
  console.log('🔌 Ny användare anslöt till socket:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Socket frånkopplad:', socket.id);
  });
});


export { io };

connectToDatabase();

server.listen(port, () => {
  console.log(`Servern körs på http://localhost:${port}`);
});

