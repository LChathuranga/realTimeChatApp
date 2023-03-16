const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messagesRoutes = require("./routes/messagesRoutes");
const socket = require("socket.io");
const { EVENTS } = require("./events/socketEvents");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo db connection successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log("Server started on port", process.env.PORT);
});

const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on(EVENTS.CONNECTION, (socket) => {
  global.chatSocket = socket;
  socket.on(EVENTS.USER.ADD_USER, (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on('send', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit(EVENTS.USER.RECEIVE_MESSAGE, data.message);
    }
  });
});
