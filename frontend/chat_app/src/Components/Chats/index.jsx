import { useContext, useEffect, useState } from "react";
import { MyContextVar } from "../../ContextApi/Context";
import MessageComp from "../Message";
import ScrollToBottom from "react-scroll-to-bottom";

import socketIo from "socket.io-client";

const Chat = () => {
  const contextVal = useContext(MyContextVar);
  const [userMessage, setUserMessage] = useState("");
  const [divsg, setDivMsg] = useState([]);
  const [socketInstance, setSocketInstance] = useState(null);
  const [selectedUser, setSelectedUSer] = useState("");
  // console.log(socketInstance);

  useEffect(() => {
    const socket = socketIo("http://localhost:8000", {
      transports: ["websocket", "polling"],
    });

    setSocketInstance(socket);
    // -----------checking connection

    socket.on("connect", () => {
      console.log("connected");
      console.log(socket.id);

      socket.emit("recentConnectedUser", {
        username: contextVal.userName,
        id: socket.id,
      });

      // ------receiving Welcome message

      socket.on("connectedUser", (data) => {
        setDivMsg((prevData) => [...prevData, data]);
      });

      // -------------Broad casting user is Connected

      socket.on("connectedUserNameBroadCast", (data) => {
        setDivMsg((prevData) => [...prevData, data]);
      });
    });

    //--------------mesage response
    socket.on("messageResponse", (data) => {
      setDivMsg((prevData) => [...prevData, data]);
    });

    //---------------------private message res

    socket.on("privateMessageRes", (data) => {
      setDivMsg((prevData) => [...prevData, data]);
    });

    // ----------user left message

    socket.on("userLeft", (data) => {
      setDivMsg((prevData) => [...prevData, data]);
    });

    // Cleanup function to disconnect socket on unmount

    return () => {
      socket.off();
      socket.disconnect();
    };
  }, [contextVal.userName]);

  //  --------------sending message

  const sendMessageFun = () => {
    if (selectedUser) {
      socketInstance.emit("priveateMessage", {
        message: userMessage,
        selectedUser,
        id: socketInstance.id,
        // senderName: contextVal.userName,
      });
      // ------------here I am updating array for mine message because we are sending private message using socket.io
      // and here io means bradasting message.

      setDivMsg((prevData) => [
        ...prevData,
        { message: userMessage, username: "you", id: socketInstance.id },
      ]);
      setUserMessage("");
    } else {
      socketInstance.emit("messageSharning", {
        message: userMessage,
        id: socketInstance.id,
      });
      setUserMessage("");
    }
  };

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center">
      <div className="md:w-[95%] md:h-[85%] bg-white pt-9 pr-9 pl-9 pb-9 flex flex-col items-center">
        <h1 className="text-red text-2xl">{contextVal.userName}</h1>
        <ScrollToBottom className="md:h-[70%] w-[100%] border border-black">
          {divsg.map((mapProp, indexNum) => (
            <MessageComp
              key={indexNum}
              user={mapProp.username}
              currentUserId={socketInstance?.id}
              userId={mapProp.id}
              message={mapProp.message}
            />
          ))}
        </ScrollToBottom>

        <div className="mt-4 flex flex-col items-center  w-[100%] outline-none">
          <input
            type="text"
            placeholder="Add Your Message"
            value={userMessage}
            onChange={(e) => {
              setUserMessage(e.target.value);
            }}
            className="w-[90%] md:h-12 pl-8 border border-black outline-none rounded-md"
          />

          <input
            type="text"
            placeholder="ENter user to send message"
            value={selectedUser}
            onChange={(e) => {
              setSelectedUSer(e.target.value);
            }}
            className="w-[90%] md:h-12 pl-8 border border-black outline-none rounded-md"
          />

          <button
            type="button"
            className="w-[90%] bg-red-600 text-white h-8 mt-3 rounded-md hover:bg-red-800"
            onClick={sendMessageFun}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
