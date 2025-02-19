const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const contactRoutes = require("./routes/contact");
const chatRoutes = require("./routes/chat");
const questionRoutes = require("./routes/question");
const responseRoutes = require("./routes/response");
dotenv.config();

const app = express();

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

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//console.log("JWT_SECRET:", process.env.JWT_SECRET);
