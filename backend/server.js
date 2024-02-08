const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const app = express()
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")
const { notFound, errorHandler } = require("./middlewares/errorMiddleware")

app.use(express.json())
dotenv.config()
connectDB()

app.use(cors())
app.use(express.json())

app.use("/api/user", userRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/message", messageRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
const server = app.listen(5000, console.log(`Server running on Port ${PORT}`))

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
})

io.on("connection", (socket) => {
  console.log("connected to socket.io")

  socket.on("setup", (userData) => {
    socket.join(userData._id)

    socket.emit("connected")
  })

  socket.on("join chat", (room) => {
    socket.join(room)
    console.log("User joined room: " + room)
  })

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat

    if (!chat.users) {
      return console.log("chat.users not defined")
    }

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return

      socket.in(user._id).emit("message recieved", newMessageRecieved)
    })
  })
})
