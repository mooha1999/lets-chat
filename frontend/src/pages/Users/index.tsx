import { useEffect, useState } from "react";
import { Else, If, Then } from "react-if";
import { Circles } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useHttpRequest } from "../../hooks/http-hook";

import styles from "./index.module.css";
const Users = ({ username }: { username: string }) => {
  const [users, setUsers] = useState<string[]>([]);
  const { sendRequest, isLoading } = useHttpRequest();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await sendRequest(
          `http://localhost:5000/api/users/friends/${username}`
        );
        setUsers(data.users);
      } catch (err) {
        alert(err || "Could not load users");
      }
    };
    getUsers();
  }, []);
  return (
    <div className={styles.users}>
      <If condition={isLoading}>
        <Then>
          <Circles />
        </Then>
        <Else>
          <If condition={users.length === 0}>
            <Then>
              <h2>No other users yet.</h2>
            </Then>
          </If>
          <Else>
            <ul>
              {users.map((user) => (
                <li className={styles.user} key={Math.random()}>
                  <Link to={`/chat/${user}`}>{user}</Link>
                </li>
              ))}
            </ul>
          </Else>
        </Else>
      </If>
    </div>
  );
};

export default Users;
