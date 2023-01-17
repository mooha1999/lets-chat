import { FormEvent, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Else, If, Then } from "react-if";
import { Circles } from "react-loader-spinner";
import { io } from "socket.io-client";

import styles from "./index.module.css";

const Chat = ({ username }: { username: string }) => {
  const socket = useRef(io("http://localhost:5000")).current;
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { uid } = useParams();

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("auth", username);
      setIsConnected(true);
    });
    socket.on("disconnect", setIsConnected.bind(null, false));
    socket.on("msg", (msg: string) =>
      setMessages([...messages, { reciever: false, message: msg }])
    );
    return () => {
      //remember to unsubscribe from the events on unmount
      socket.off("connection");
      socket.off("disconnect");
      socket.off("msg");
    };
  }, [messages]);
  const sendMsg = (e: FormEvent) => {
    e.preventDefault();
    if (inputMessage === "") return;
    socket.emit("msg", {
      message: inputMessage,
      reciever: uid,
    });
    setMessages([...messages, { reciever: true, message: inputMessage }]);
    setInputMessage("");
  };
  const mapMessages = (msg: Message) => {
    return (
      <li
        className={msg.reciever ? styles.reciever : styles.sender}
        key={Math.random()}
      >
        {msg.message}
      </li>
    );
  };
  return (
    <If condition={!isConnected}>
      <Then>
        <div className={styles.loading_container}>
          <Circles />
        </div>
      </Then>
      <Else>
        <ul className={styles.messages}>{messages.map(mapMessages)}</ul>
        <form className={styles.form} onSubmit={sendMsg}>
          <input
            className={styles.input}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Message..."
          />
          <button>Send</button>
        </form>
      </Else>
    </If>
  );
};

export default Chat;

interface Message {
  reciever: boolean;
  message: string;
}
