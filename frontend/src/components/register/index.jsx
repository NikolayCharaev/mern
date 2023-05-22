import { useState } from 'react';
import CustomButton from '../custom/button';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { FaSpinner } from 'react-icons/fa';
import { BiErrorAlt } from 'react-icons/bi';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';

import { Navigate } from 'react-router-dom';

const Register = () => {
  const status = useSelector((state) => state.auth.registerStatus);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function onSubmit(values) {
    setLoading(true);
    setTimeout(async () => {
      const data = await dispatch(fetchRegister(values));
      setLoading(false);
      if (!data.payload) {
        return;
      }
      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      } else {
        return alert('Не удалось авторизоваться');
      }
      reset();
      return data;
    }, 1500);
  }

  const isAuthUser = useSelector(selectIsAuth);
  if (isAuthUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-20">
      {loading && (
        <div className="flex items-center gap-4 justify-center transition">
          <h1>Идет загрузка</h1>
          <FaSpinner className="animate-spin w-10 h-10" />
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-4 justify-center transition">
          <h1>Не удалось создать пользователя</h1>
          <BiErrorAlt className="text-2xl" />
        </div>
      )}
      {/* {status === 'error' && !loading && (
        <div className=" flex items-center gap-4 justify-center transition">
          <h1>Произошла ошибка. Проверьте правильность введенных данных</h1>
          <BiErrorAlt />
        </div>
      )} */}
      <form
        className="p-7 border border-white rounded mx-auto max-w-3xl flex flex-col gap-8 items-start mt-28"
        onSubmit={handleSubmit(onSubmit)}>
        <label className="text-center w-full">Зарегистрироваться</label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={'введите имя пользователя'}
          type="text"
          {...register('username', {
            required: 'Поле обязательно для заполнения',
          })}
        />
        {errors.username && <p className="text-sm text-red-500 mt-2">{errors.password.message}</p>}
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="email"
          placeholder={'введите email'}
          {...register('email', {
            required: 'Поле обязательно для заполнения',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'введите корректный email',
            },
          })}
        />
        {errors.email && <p className="text-sm text-red-500 mt-2">{errors.password.message}</p>}
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={'введите пароль'}
          type="password"
          {...register('password', {
            required: 'Поле обязательно для заполнения',
            minLength: {
              value: 4,
              message: 'Пароль должее быть не менее 4-х символов',
            },
          })}
        />
        {errors.password && <p className="text-sm text-red-500 mt-2">{errors.password.message}</p>}

        <CustomButton text={'зарегистрироваться'} />
      </form>
    </div>
  );
};

export default Register;
