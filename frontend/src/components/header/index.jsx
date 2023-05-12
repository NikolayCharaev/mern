import CustomButton from '../custom/button';
import { FcPuzzle } from 'react-icons/fc';

import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className="flex justify-between items-center h-[80px]">
      <div className="bg-blue-600 p-2 rounded hover:bg-blue-500 transition">
        <Link to="/">
          <FcPuzzle className="text-5xl cursor-pointer" />
        </Link>
      </div>
      <div className="flex gap-5">
        <Link to="/login">
          <CustomButton text={'войти'} />
        </Link>
        <Link to="/register">
          <CustomButton text={'зарегистрироваться'} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
