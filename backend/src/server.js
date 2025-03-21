const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const http = require("http");


const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const contactRoutes = require("./routes/contact");
const chatRoutes = require("./routes/chat");
const questionRoutes = require("./routes/question");
const responseRoutes = require("./routes/response");
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Update for production security
  },
});


// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/appointments", require("./routes/appointments"));

app.use("/api/contact", contactRoutes);

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", chatRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/responses", responseRoutes);

//app.use("/api/notifications", require("./routes/notifications"));

//video call

let rooms = {}; // Store rooms and users

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join-room", ({ roomId, userId, role }) => {
    if (!rooms[roomId]) {
      rooms[roomId] = { admin: null, user: null };
    }

    if (role === "Admin" && !rooms[roomId].admin) {
      rooms[roomId].admin = socket.id;
    } else if (role === "User" && !rooms[roomId].user) {
      rooms[roomId].user = socket.id;
    } else {
      socket.emit("room-full");
      return;
    }

    socket.join(roomId);
    io.to(roomId).emit("user-joined", { userId, role });

    if (rooms[roomId].admin && rooms[roomId].user) {
      io.to(roomId).emit("start-call");
    }
  });

  socket.on("offer", ({ offer, roomId }) => {
    socket.to(roomId).emit("offer", { offer });
  });

  socket.on("answer", ({ answer, roomId }) => {
    socket.to(roomId).emit("answer", { answer });
  });

  socket.on("candidate", ({ candidate, roomId }) => {
    socket.to(roomId).emit("candidate", { candidate });
  });

  socket.on("leave-room", ({ roomId }) => {
    if (rooms[roomId]) {
      if (rooms[roomId].admin === socket.id) rooms[roomId].admin = null;
      if (rooms[roomId].user === socket.id) rooms[roomId].user = null;
      if (!rooms[roomId].admin && !rooms[roomId].user) delete rooms[roomId];
    }
    io.to(roomId).emit("user-left");
    socket.leave(roomId);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});
// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//console.log("JWT_SECRET:", process.env.JWT_SECRET);