import { Server } from "socket.io";
import ClientToServerEvents from "../interfaces/clien-to-server-events";

export default function chatSocket(io: Server<ClientToServerEvents>): void {
  io.on('connection', (socket) => {
    socket.on('auth', (username, reciever) => {
      // const roomID = uuidv4();
      const key = [username, reciever].sort().join('');
      socket.join(key);
    });
    socket.on('msg', async (data) => {
      const key = [data.sender, data.reciever].sort().join('');
      //TODO save the message  
      socket.to(key).emit('msg', data);
    });
  });
}