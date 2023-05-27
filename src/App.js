import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

// const socket = io.connect("http://localhost:5000");
const socket = io.connect("https://chatserver-j6h4.onrender.com");

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="logPage">
          <div className="logContent">
            <h2>Let's Chat...</h2>
            <input
              type="text"
              placeholder="Your name..."
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="User Id..."
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button className="chatBtn" onClick={() => joinRoom()}>
              Chat
            </button>
          </div>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={room}></Chat>
      )}
    </div>
  );
}

export default App;
