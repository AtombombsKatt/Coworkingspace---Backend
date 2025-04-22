"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const dataBase_1 = require("./config/dataBase");
dotenv_1.default.config();
const port = process.env.PORT || 5000;
const server = http_1.default.createServer(app_1.default);
//websocket
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
exports.io = io;
io.on('connection', (socket) => {
    console.log('🔌 Ny användare anslöt till socket:', socket.id);
    socket.on('disconnect', () => {
        console.log('❌ Socket frånkopplad:', socket.id);
    });
});
(0, dataBase_1.connectToDatabase)();
server.listen(port, () => {
    console.log(`Servern körs på http://localhost:${port}`);
});
