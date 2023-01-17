import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

const Auth = ({setUser}:{setUser: (s:string)=>void}) => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        method: "POST",
      });
      if(response.ok)
      {
        setUser(username);
        navigate('/users');
      }
      
    } catch (error) {alert(error);}
  };

  return (
    <div className={styles.login}>
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
        <button
          type="submit"
          onClick={submitHandler}
          disabled={username.length < 4 || password.length < 6}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Auth;
