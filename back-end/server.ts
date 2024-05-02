import { Socket } from "socket.io";
import { app } from "./app";
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log(`Server is running: ${PORT}`))

export const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: [
        "http://localhost:5173"
      ]
      // credentials: true,
    },
});

export interface IUserSocket {
  userId: string
  socketId: string
}

export const userIds: IUserSocket[] = []

let socket: Socket;

io.on("connection", (connectedSocket: Socket) => {
    socket = connectedSocket;
    socket.on("user logged", (userId: any) => {
      const containsId = userIds.includes(userId)
      if (containsId === false) {
        const userSocket: IUserSocket = {
          userId: userId,
          socketId: socket.id
        }
        userIds.push(userSocket)
      }
    })
});

