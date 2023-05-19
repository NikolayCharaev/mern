import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

import userModal from '../models/userModal.js';

/**
    @desc Регистрация пользователя
 */
export const register = async (req, res) => {
  try {
    const myPassword = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(myPassword, salt);

    const doc = new userModal({
      email: req.body.email,
      password: pass,
      username: req.body.username,
    });
    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );

    const { password, ...userData } = user._doc;
    res.json({
      userData,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: 'Не удалось создать пользователя',
    });
  }
};

/**
 @desc Авторизация пользователя
 */
export const login = async (req, res) => {
  try {
    const user = await userModal.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: 'Не удалось найти пользователя',
      });
    }
    const isValidPass = await bcrypt.compare(req.body.password, user._doc.password); // сравнивание паролей

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Неверный логин или пароль',
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      },
    );

    const { password, ...userData } = user._doc;
    res.json({
      userData,
      token,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'Не удалось авторизоваться',
    });
  }
};

/**
 * 
@desc Информация о пользователе
 */
export const getMe = async (req, res, next) => {
  try {
    const user = await userModal.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: 'Не удалось найти пользователя',
      });
    }
    const { password, ...userData } = user._doc;
    res.json({
      userData,
    });
  } catch (err) {
    console.log(err);
  }
};
