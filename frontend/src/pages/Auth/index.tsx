import { useEffect, useState } from "react";
import { Else, If, Then } from "react-if";
import { useNavigate } from "react-router-dom";
import { useHttpRequest } from "../../hooks/http-hook";
import { Circles } from "react-loader-spinner";

import styles from "./index.module.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Auth = ({ setUser }: { setUser: (s: string) => void }) => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { sendRequest, isLoading } = useHttpRequest();
  const navigate = useNavigate();
  useEffect(() => setUser(""), []);
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
    <div className={styles["form-container"]}>
      <If condition={isLoading}>
        <Then>
          <Circles />
        </Then>
        <Else>
          {/* <div>
            <h1 className="m-5">Let's Chat</h1>
            <h4>Sign in</h4>
            <p>Sign in to continue to Let's Chat</p>
          </div> */}
          {/* <form className={styles.form} onSubmit={submitHandler}>
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
            <div className="">
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
          </form> */}
          <Form className={`w-100 m-auto ${styles.form}`}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" minLength={8} placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Else>
      </If>
    </div>
  );
};

export default Auth;
