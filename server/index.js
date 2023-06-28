const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messagesRoutes = require("./routes/messagesRoutes");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URL);
    console.log("DB connected successfully");
  } catch (err) {
    console.log(err.message);
  }
};

connectToMongo();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", async (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  
  socket.on("send-msg", (data) => {
    console.log(data);
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      console.log(data);
      socket.to(sendUserSocket).emit("msg-receive", data.msg);
    }
  });
});
