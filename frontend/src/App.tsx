import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import Users from "./pages/Users";

const App = () => {
  const [username, setUserName] = useState<string>("");
  return (
    <Routes>
      <Route path="/" element={<Auth setUser={setUserName}/>} />
      <Route path="/users" element={<Users username={username}/>} />
      <Route path="chat/:uid" element={<Chat username={username} />} />
    </Routes>
  );
};

export default App;
