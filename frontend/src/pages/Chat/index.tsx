import { useParams } from "react-router-dom";
import { Else, If, Then } from "react-if";
import { Circles } from "react-loader-spinner";

import styles from "./index.module.css";
import useSocket from "../../hooks/socket-hook";

const Chat = ({ username }: { username: string }) => {
  const { uid } = useParams();
  const [
    isConnected, messages, sendMsg, inputMessage, setInputMessage
   ] = useSocket(username, uid as string);
  
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
        <div className={styles.container}>
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
        </div>
      </Else>
    </If>
  );
};

export default Chat;

interface Message {
  reciever: boolean;
  message: string;
}
