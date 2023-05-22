import { useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import CustomButton from '../custom/button';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRemovePost, fetchPosts } from '../../redux/slices/posts';
import axios from '../../axios';

const OnePost = ({ post }) => {
  const { _id, description, title, viewsCount, user } = post;
  const { username } = user;
  const userId = useSelector((state) => state.auth.data?.userData?._id || '');
  const [changedTitle, setChangedTitle] = useState(title);
  const [changedDescription, setChangedDescription] = useState(description);
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useDispatch();

  return (
    <div key={_id}>
      <Link to={isChanged ? '' : `/posts/${_id}`}>
        <div className="bg-cardBg p-5 grid-item flex-grow rounded cursor-pointer flex flex-col justify-between min-h-[336px]">
          {isChanged ? (
            <>
              <input
                type="text"
                value={changedTitle}
                className="text-black"
                onChange={(e) => {
                  setChangedTitle(e.target.value);
                }}
              />
              <textarea
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={'введите текст'}
                value={changedDescription}
                onChange={(e) => {
                  setChangedDescription(e.target.value);
                }}
              />
            </>
          ) : (
            <>
              <h2 className="text-left inline-block p-4 bg-slate-500 rounded text-white text-2xl mb-4 w-56 overflow-hidden text-ellipsis whitespace-nowrap">
                {title}
              </h2>
              <p className="w-[80%] overflow-hidden text-ellipsis whitespace-nowrap">
                {description}
              </p>
            </>
          )}

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
                  setIsChanged(!isChanged);
                }}
              />
              {isChanged && (
                <CustomButton
                  text="применить"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(changedTitle)
                    console.log(changedDescription)
                    console.log(_id)
                    axios.patch(`/posts/${_id}`, {
                      title : changedTitle,
                      description : changedDescription,
                    });
                    setIsChanged(false)
                    dispatch(fetchPosts())
                  }}
                />
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default OnePost;
