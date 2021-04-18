const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

app.get("/", (req, res) => {
  res.send("<h1>Hey warup</h1>")
})

let numUsers = 0

io.on("connection", (socket) => {
  let addedUser = false
  console.log("a user connected")
  // when the client emits 'newMessage', this listens and executes
  socket.on("newMessage", (data) => {
    // we tell the client to execute 'NewMessage'
    // Sets a modifier for a subsequent event emission that the event data will only be broadcast to every sockets but the sender.
    socket.emit("newMessage", {
      username: socket.username,
      message: data,
    })
  })

  socket.on("addUser", (username) => {
    if (addedUser) return

    // We store the username in the socket session for this client
    ;(socket.username = username), ++numUsers
    addedUser = true
    socket.emit("login", {
      numUsers,
    })
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit("userJoined", {
      username: socket.username,
      numUsers: numUsers,
    })
  })
})

server.listen(3100, () => {
  console.log("listening on *:3100")
})
