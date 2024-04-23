import io, { Socket } from 'socket.io-client'
const ENDPOINT = "http://localhost:3000";
const socket = io(ENDPOINT)

const connectionSocket = async () => {
    try {
        socket.emit("connection", "teste");
        console.log("connection");
    } catch (error: any) {
        console.log("error in socket")
    }
}

const userCreateBudget = () => {
    return new Promise((resolve, reject) => {
      socket.on("create budget", (newBudget) => {
        console.log("create budget", newBudget);
        resolve(newBudget);
      });
  
      socket.on("error", (error) => {
        console.error("Socket error", error);
        reject(error);
      });
    });
  };

// const userCreateBudget = async () => {
//     try {
//         socket.on("create budget", (socket: Socket) => {
//             console.log("create budget", socket);
//             return socket
//         });
//     } catch (error: any) {
//         console.log("error in socket")
//     }
// }

export const NotificationService = {
    connectionSocket,
    userCreateBudget,
    socket
}