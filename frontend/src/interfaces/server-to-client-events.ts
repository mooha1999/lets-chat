export interface ServerToClientEvents{
  connect: ()=>void;
  disconnect: ()=>void;
  msg: (_: {message: string,sender: string, reciever: string})=>void;
  auth: (username:string, reciever: string)=>void;
}