import { body } from 'express-validator';

export const registerValidation = [
  body('email', 'введен некорректный email адрес').isEmail(), // почта должна быть почтой
  body('password', 'слишком короткий пароль').isLength({ min: 3 }), // у пароля должно быть минимум 5 символов
  body('username', 'неправильное имя пользователя').isLength({ min: 3 }), // минимум 3 символа
];
