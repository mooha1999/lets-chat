import express, { json } from "express";
import http from "http";
const app = express();

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

export const users = new Map<string, string>();

app.post('/login', async (req, res) => {
  const { username } = req.body;
  users.set(username, '');
  res.status(201).json({ username });
});

app.get('/users/:uid', (req, res) => {
  const { uid } = req.params;
  res.status(200).json({ users: Array.from(users.keys()).filter(u => u !== uid) });
});

export const server = http.createServer(app);

