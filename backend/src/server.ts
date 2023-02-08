import express, { json, NextFunction, Request, Response } from "express";
import http from "http";
import HttpError from "./models/http-error";
import usersRouter from "./Routes/users-route";
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
app.use('api/users', usersRouter);
//For unsupported routes
app.use((_, __, ___) => {
  throw new HttpError('Could not find this route', 404);
})
app.use((error: HttpError, _: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500).json({ message: error.message || 'An unknown error occured' });
});
export const users = new Map<string, string>();

export const server = http.createServer(app);

