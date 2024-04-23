import { Socket } from "socket.io";
import { app } from "./app";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log(`Server is running: ${PORT}`))

export const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: [
        "http://localhost:3000",
        "http://localhost:5173"
      ]
      // credentials: true,
    },
});

io.on("connection", (socket: Socket) => {
    console.log("Connected to socket.io")
});