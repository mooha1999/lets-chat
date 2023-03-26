import { Socket } from "socket.io";

export default async function emitMessage(this: Socket, data: IData){
  const key = [data.sender, data.reciever].sort().join('');
  //TODO save the message  
  this.to(key).emit('msg', data);
}

interface IData{
  sender: string,
  reciever: string
}