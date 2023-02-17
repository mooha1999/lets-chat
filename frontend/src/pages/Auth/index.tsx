import { FormEvent, useState } from "react";
import { Else, If, Then } from "react-if";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useHttpRequest } from "../../hooks/http-hook";
import styles from "./index.module.css";

const Auth = ({ setUser }: { setUser: (s: string) => void }) => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { sendRequest, isLoading } = useHttpRequest();
  const navigate = useNavigate();
  
  const submitHandler = async () => {
    try {
      await sendRequest(
        `http://localhost:5000/api/users/${apiRoute}`,
        "POST",
        JSON.stringify({ username, password }),
        { "Content-Type": "application/json" }
        );
      setUser(username);
      navigate("/users");
    } catch (err) {
      alert(`could not ${apiRoute}`);
    }
  };
  
  let apiRoute: string;
  return (
    <div className={styles.login}>
      <If condition={isLoading}>
        <Then>
          <Circles />
        </Then>
        <Else>
          <h1>Let's Chat</h1>
          <form className={styles.form} onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                apiRoute = 'login';
                submitHandler();
              }}
              disabled={username.length < 4 || password.length < 6}
            >
              Log in
            </button>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                apiRoute = 'signup';
                submitHandler();
              }}
              disabled={username.length < 4 || password.length < 6}
            >
              Sign up
            </button>
            </div>
          </form>
        </Else>
      </If>
    </div>
  );
};

export default Auth;
