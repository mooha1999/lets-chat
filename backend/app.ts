import express, { json, NextFunction, Request, Response } from "express";
import https from "https";
import mongoose from "mongoose";
import { Server } from "socket.io";

import HttpError from "./src/models/http-error";
import usersRouter from "./src/routes/users-route";
import chatSocket from "./src/sockets/chat";
import ClientToServerEvents from "./src/interfaces/clien-to-server-events";

const app = express();
//Parse the body to JSON format
app.use(json());
//CORS
app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //The astric means that all domains have access
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  next()
});
//Handle Users Authentication
app.use('/api/users', usersRouter);
//For unsupported routes
app.use((_, __, ___) => {
  throw new HttpError('Could not find this route', 404);
})
//Error handling
app.use((error: HttpError, _: Request, res: Response, next: NextFunction) => {
  if (!res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500).json({ message: error.message || 'An unknown error occured' });
});

const httpsServer = https.createServer(app);
const io = new Server<ClientToServerEvents>(httpsServer, {
  cors: {
    origin: '*'
  },
  allowEIO3: true
});
chatSocket(io);

const PORT = process.env.PORT || 5000;

startServer();

async function startServer(): Promise<void> {
  try {
    await mongoose.set('strictQuery', true).connect(process.env.MONGOOSE_URL || '');
    httpsServer.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`)
    });
  } catch (err) {
    console.error(err);
  }
}