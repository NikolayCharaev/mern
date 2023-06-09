import CustomButton from '../custom/button';
import { FcPuzzle } from 'react-icons/fc';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';
import { Link } from 'react-router-dom';

import { fetchPosts } from '../../redux/slices/posts';

const Header = () => {
  const isAuthUser = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  return (
    <header className="flex justify-between items-center h-[80px]">
      <div className="bg-blue-600 p-2 rounded hover:bg-blue-500 transition">
        <Link to="/" className="flex items-center gap-3">
          <FcPuzzle
            className="text-5xl cursor-pointer"
            onClick={() => {
              dispatch(fetchPosts());
            }}
          />
        </Link>
      </div>
      <div className="flex gap-5">
        {!isAuthUser ? (
          <>
            <Link to="/login">
              <CustomButton text={'войти'} />
            </Link>
            <Link to="/register">
              <CustomButton text={'зарегистрироваться'} />
            </Link>
          </>
        ) : (
          <>
            <Link to="/newPost">
              <CustomButton text={'написать статью'} />
            </Link>
            <CustomButton
              onClick={() => {
                dispatch(logout());
              }}
              text={'выйти'}
              styles="bg-red-500 hover:bg-red-600"
            />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
