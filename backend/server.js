import { Server } from "socket.io";
import express from 'express';
import { createServer } from 'http';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("Socket: ", socket);
    console.log("The socket is active to be connected!")

    socket.on("chat", (payload) => {
        console.log("What is payload", payload);
        io.emit("chat", payload)
    })
})

server.listen(5000, () => {
    console.log("Server is listening at port 5000")
})