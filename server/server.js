const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const authRoutes = require("./routes/auth.routes");
const sosRoutes = require("./routes/sos.routes");
const resourceRoutes = require("./routes/resource.routes");


const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server,{
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

const initSocket = require("./config/socket")
initSocket(io)
const { setIO } = require("./config/socketInstance")
setIO(io)

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/sos",sosRoutes);
app.use("/api/resource", resourceRoutes)
// Routes
app.get("/", (req, res) => {
  res.send("App is running");
});

// MongoDB Connection
const dbURI = process.env.MONGO_URI;

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB!");

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });

 