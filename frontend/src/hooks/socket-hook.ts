import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ServerToClientEvents } from "../interfaces/server-to-client-events";

const useSocket = (sender: string, reciever: string) => {
  //Connect to the server through a ref to survive re-renders
  const socket: Socket<ServerToClientEvents> = useRef(io("http://localhost:5000")).current;
  //Connection of the socket
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  //Handle user input
  const [inputMessage, setInputMessage] = useState<string>('');
  //Handle messages
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("msg", msg =>
      setMessages([...messages, { reciever: false, message: msg.message }])
    );
  }, [messages]);

  useEffect(()=>{
    socket.on("connect", () => {
      socket.emit("auth", sender, reciever);
      setIsConnected(true);
    });
    socket.on("disconnect", () => setIsConnected(false));
    return () => {
      //remember to unsubscribe from the events on unmount
      socket.off("connect");
      socket.off("disconnect");
      socket.off("msg");
      // socket.disconnect();
    };
  },[])

  const sendMsg = useCallback((e: FormEvent) => {
    if (inputMessage === "") return;
    e.preventDefault();
    
    socket.emit("msg", {
      message: inputMessage,
      reciever,
      sender,
    });
    setMessages([...messages, { reciever: true, message: inputMessage }]);
    setInputMessage("");
  }, [messages, inputMessage]);

  return [isConnected, messages, sendMsg, inputMessage, setInputMessage] as const
}

export default useSocket;

interface Message {
  reciever: boolean;
  message: string;
}