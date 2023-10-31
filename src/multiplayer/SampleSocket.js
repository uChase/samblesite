import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://45.33.62.126:3001";

const SampleSocket = () => {
  const [connected, setConnected] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socketRef = useRef();

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(SOCKET_SERVER_URL);

    socketRef.current.on("connect", () => {
      setConnected(true);
      console.log("Connected to the server!");
    });

    socketRef.current.on("chat message", (receivedMessage) => {
      setChatMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });

    socketRef.current.on("disconnect", () => {
      setConnected(false);
      console.log("Disconnected from the server!");
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socketRef.current.disconnect();
    };
  }, []); // The empty dependency array ensures this useEffect is run only once when component mounts.

  const handleSendMessage = () => {
    if (message.trim()) {
      socketRef.current.emit("chat message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {chatMessages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default SampleSocket;
