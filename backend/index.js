import express from 'express';
import dotenv from 'dotenv';
import { getMe, login, register } from './controllers/userController.js';
import mongoose from 'mongoose';
import cors from 'cors'
// import { addPost } from './controllers/postController.js';
import { create, remove, getOne, update, getAll } from './controllers/postController.js';
import checkAuth from './utils/checkAuth.js';
dotenv.config();
mongoose
  .connect(process.env.MONGO_SERVER_KEY)
  .then(() => {
    console.log('mongoose тоже запущен :)');
  })
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cors())
app.listen(7777, () => {
  console.log('Сервер запущен :)');
});

// users
app.get('/', (req, res) => {
  res.send('Привет :)');
});
app.post('/register', register);
app.post('/login', login);
app.get('/me', checkAuth, getMe);

// posts

app.post('/posts', checkAuth, create);
app.delete('/posts/:id', checkAuth, remove);
app.get('/posts/:id', checkAuth, getOne);
app.patch('/posts/:id', checkAuth, update);
app.get('/posts', getAll);
