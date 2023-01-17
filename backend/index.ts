import { server, users } from './src/server';
import { Server } from "socket.io";
import { v4 as uuidv4 } from 'uuid';

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  socket.on('auth', (username: string) => {
    const roomID = uuidv4();
    socket.join(roomID);
    users.set(username, roomID);
  });
  socket.on('msg', (data: { message: string, reciever: string }) => {
    const recieverRoom = users.get(data.reciever) as string;
    socket.to(recieverRoom).emit('msg',data.message);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

// mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cmcat.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
//   .then(() => server.listen(PORT, () => console.log(`Listening on port ${PORT}`)))
//   .catch(err => console.log(err));