import { useEffect, useState } from "react";
import { Else, If, Then } from "react-if";
import { Circles } from "react-loader-spinner";
import { Link } from "react-router-dom";

import styles from "./index.module.css";

const Users = ({ username }: { username: string }) => {
  const [users, setUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${username}`);
        const data = await response.json();
        //! Remove in production
        setTimeout(() => {
          setUsers(data.users);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        alert(error);
      }
    };
    getUsers();
  });
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
            {users.map((user) => (
              <div className={styles.user} key={Math.random()}>
                <Link to={`/chat/${user}`}>{user}</Link>
              </div>
            ))}
          </Else>
        </Else>
      </If>
    </div>
  );
};

export default Users;
