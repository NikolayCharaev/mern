import CustomButton from '../custom/button';
import { useForm } from 'react-hook-form';
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
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
  );
};

export default Login;
