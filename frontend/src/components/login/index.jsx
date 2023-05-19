import { useState } from 'react';
import CustomButton from '../custom/button';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

import { BiErrorAlt } from 'react-icons/bi';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, selectIsAuth } from '../../redux/slices/auth';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit =  (values) => {
    setLoading(true);
    setTimeout( async () => {
      const data = await dispatch(fetchUserData(values));
        console.log(data)
      setLoading(false);
      console.log(data);
      if (!data.payload) {
        return;
      }
      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      }else { 
       return alert('Не удалось авторизоваться')
      }
      return data;
    }, 1500);
  };
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
      {status === 'error' && !loading && (
        <div className=" flex items-center gap-4 justify-center transition">
          <h1>Произошла ошибка. Проверьте правильность введенных данных</h1>
          <BiErrorAlt />
        </div>
      )}
      <form
        className="p-7 border border-white rounded mx-auto max-w-3xl flex flex-col gap-4 items-start mt-28"
        onSubmit={handleSubmit(onSubmit)}>
        <label className="text-center w-full">Войти</label>
        <div className="w-full">
          <input
            type="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={'введите email'}
            {...register('email', {
              required: 'поле email обязательно для заполнения',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'введите корректный email',
              },
            })}
          />
          {(errors.email?.type === 'required' || errors.email?.type === 'pattern') && (
            <p className="text-sm text-red-500 mt-2">{errors.email.message}</p>
          )}
        </div>

        <div className="w-full">
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={'введите пароль'}
            {...register('password', {
              required: 'Поле password обязательно для заполнения',
              minLength: {
                value: 4,
                message: 'пароль должен быть не менее 4 символов',
              },
            })}
          />
          {(errors.password?.type === 'required' || errors.password?.type === 'minLength') && (
            <p className="text-sm text-red-500 mt-2">{errors.password.message}</p>
          )}
        </div>

        <CustomButton text={'войти'} type="submit" />
      </form>
    </div>
  );
};

export default Login;
