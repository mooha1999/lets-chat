import { Server } from "socket.io";

import ClientToServerEvents from "../interfaces/clien-to-server-events";
import emitMessage from "./socket-controllers/emit-message";
import joinRoom from "./socket-controllers/join-room";

export default function chatSocket(io: Server<ClientToServerEvents>): void {
  io.on('connection', (socket) => {
    socket.on('auth', joinRoom);
    socket.on('msg', emitMessage);
  });
}