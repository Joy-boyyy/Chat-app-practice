const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server);

const users = {};

io.on("connection", (socket) => {
  console.log("we are in Socket");

  // receiving recent connected user id

  socket.on("recentConnectedUser", ({ id, username }) => {
    users[id] = username;

    //------- Welcome message to Connected USer

    socket.emit("connectedUser", { message: `Welcome ${username} !!` });

    //------- Letting them kknow Connected User

    socket.broadcast.emit("connectedUserNameBroadCast", {
      message: `${username} has Joined !!!`,
    });

    //----------------------private message

    socket.on("priveateMessage", ({ message, selectedUser, id }) => {
      console.log(`Private message from ${id} to ${selectedUser}: ${message}`);
      socket
        .to(selectedUser)
        .emit("privateMessageRes", { id, username: users[id], message });
    });

    // ----------------message sharning

    socket.on("messageSharning", ({ message, id }) => {
      io.emit("messageResponse", { id, username: users[id], message });
    });

    // -----------------------Broadcast user left message

    socket.on("disconnect", () => {
      socket.broadcast.emit("userLeft", {
        message: `${username} has Left the Chat`,
      });
      delete users[id];
    });
  });
});

server.listen(port, () => {
  console.log(`we are in port number ${port}`);
});
