import { Server } from 'socket.io';

let io: Server;

export const setSocketServer = (socketServer: Server) => {
  io = socketServer;
};

export const emitJobUpdate = (jobId: string, status: string) => {
  if (io) {
    io.emit('jobUpdate', { jobId, status });
  }
};