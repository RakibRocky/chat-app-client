import React, { useEffect, useMemo, useRef, useState } from "react";
import TopBar from "./topBar/TopBar";
import "./chat.css";
import ScrollToBottom from "react-scroll-to-bottom";
import { BsFillSendFill } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
const Chat = ({ socket, userName, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };
  const memoizedSocket = useMemo(() => socket, [socket]);
  useEffect(() => {
    memoizedSocket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      console.log(data);
    });
    return () => {
      memoizedSocket.off("receive_message");
    };
  }, [memoizedSocket]);
  // console.log(messageList);
  const messageListRef = useRef(null);
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [messageList]);

  return (
    <div className="chatPageUp">
      <div className="chatPage">
        <div className="chatHeader">
          <TopBar name={userName}></TopBar>
        </div>
        <div className="chatBody" ref={messageListRef}>
          {messageList.map((m) => {
            return (
              <div
                id={userName === m.author ? "me" : "you"}
                ref={messageListRef}
              >
                {" "}
                <div className="chatM ">
                  <p>{m.message}</p>
                  <span className="mInfo">
                    {userName === m.author
                      ? `${m.time}`
                      : `${m.author + "_" + m.time}`}
                  </span>

                  {/* <span className="mInfo">{`${m.author} ${m.time}`}</span> */}
                </div>
              </div>
            );
          })}
        </div>
        <div className="chatFooter">
          <input
            type="text"
            placeholder="write your message"
            name=""
            id=""
            value={currentMessage}
            onChange={(event) => {
              setCurrentMessage(event.target.value);
            }}
            onKeyDown={(event) => {
              event.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>
            <BsFillSendFill></BsFillSendFill>{" "}
          </button>
        </div>
      </div>{" "}
    </div>
  );
};

export default Chat;
