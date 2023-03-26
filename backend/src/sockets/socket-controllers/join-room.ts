import { Socket } from "socket.io";

export default function joinRoom(this: Socket, username: string, reciever: string) {
  // const roomID = uuidv4();
  const key = [username, reciever].sort().join('');
  this.join(key);
}