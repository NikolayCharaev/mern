import { AiFillEye } from 'react-icons/ai';
import CustomButton from '../custom/button';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRemovePost, fetchPosts } from '../../redux/slices/posts';

const OnePost = ({ post }) => {
  const dispatch = useDispatch();
  const { _id, description, title, viewsCount, user } = post;
  const { username } = user;
  const userId = useSelector((state) => state.auth.data?.userData?._id || '');

  return (
    <div key={_id}>
      <Link to={`/posts/${_id}`}>
        <div className="bg-cardBg p-5 grid-item flex-grow rounded cursor-pointer flex flex-col justify-between min-h-[336px]">
          <h2 className="text-left inline-block p-4 bg-slate-500 rounded text-white text-2xl mb-4 w-56 overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </h2>
          <p className="w-[80%] overflow-hidden text-ellipsis whitespace-nowrap">{description}</p>
          <div className="flex items-center gap-1 justify-between my-4 p-2 bg-blue-200 text-black rounded">
            <p>{username}</p>
            <div className="flex gap-1 items-center">
              <p>{viewsCount}</p>
              <AiFillEye />
            </div>
          </div>
          {user?._id === userId && (
            <div className="flex items-center mt-5 gap-4 ">
              <CustomButton
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchRemovePost(_id));
                }}
                text="удалить"
                styles="bg-red-600 hover:bg-red-700 transition"
              />
              <CustomButton
                text="изменить"
                onClick={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default OnePost;
