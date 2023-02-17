import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const useSocket = (sender: string, reciever: string) => {
  //Connect to the server through a ref to survive re-renders
  const socket = useRef(io("http://localhost:5000")).current;
  //Connection of the socket
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  //Handle user input
  const [inputMessage, setInputMessage] = useState<string>('');
  //Handle messages
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("auth", sender);
      setIsConnected(true);
    });
    socket.on("disconnect", () => setIsConnected(false));
    socket.on("msg", (msg: string) =>
      setMessages([...messages, { reciever: false, message: msg }])
    );
    return () => {
      //remember to unsubscribe from the events on unmount
      socket.off("connect");
      socket.off("disconnect");
      socket.off("msg");
    };
  }, [messages]);

  const sendMsg = useCallback((e: FormEvent) => {
    if (inputMessage === "") return;
    e.preventDefault();
    
    socket.emit("msg", {
      message: inputMessage,
      reciever,
    });
    setMessages([...messages, { reciever: true, message: inputMessage }]);
    setInputMessage("");
  }, [messages, inputMessage]);

  return {isConnected, messages, sendMsg, inputMessage, setInputMessage}
}

export default useSocket;

interface Message {
  reciever: boolean;
  message: string;
}