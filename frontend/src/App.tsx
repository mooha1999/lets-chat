import { useState } from "react";
import { If, Then } from "react-if";
import { Route, Routes } from "react-router-dom";

import Navigation from "./components/Navigation";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import Users from "./pages/Users";

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [username, setUserName] = useState<string>("");
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth setUser={setUserName} />} />
        <Route path="/users" element={<Users username={username} />} />
        <Route path="chat/:uid" element={<Chat username={username} />} />
      </Routes>
      <If condition={username}>
        <Then>
          <Navigation />
        </Then>
      </If>
    </>
  );
};

export default App;
