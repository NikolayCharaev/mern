import CustomInput from '../custom/input';
import CustomButton from '../custom/button';
const Register = () => {
  return (
    <form className="p-7 border border-white rounded mx-auto max-w-3xl flex flex-col gap-8 items-start mt-28">
        <label className='text-center w-full'>Зарегистрироваться</label>
      <CustomInput placeholder={'введите имя пользователя'} inputType="text" />
      <CustomInput placeholder={'введите email'} inputType="email" />
      <CustomInput placeholder={'введите пароль'} inputType="password" />

      <CustomButton text={'зарегистрироваться'} />
    </form>
  );
};

export default Register;
