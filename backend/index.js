import express from 'express';
import { getMe, login, register } from './controllers/userController.js';
import mongoose from 'mongoose';

mongoose
  .connect(
    'mongodb+srv://admin:wwwwww@cluster0.m6dkocn.mongodb.net/myMernProject?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('mongoose тоже запущен :)');
  })
  .catch((err) => console.log(err));

const app = express();
app.use(express.json())
app.listen(7777, () => {
  console.log('Сервер запущен :)');
});

app.get('/', (req, res) => {
  res.send('Привет :)');
});
app.post('/register', register);
app.post('/login', login);
app.get('/me', getMe)
