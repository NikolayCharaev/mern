import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../../redux/slices/posts';
import { FaSpinner } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';
import CustomButton from '../custom/button';
import OnePost from '../onePost';
const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);



  const status = useSelector((state) => state.posts.status);
  useEffect(() => {
    if (posts.length <= 0) {
      setTimeout(() => {
        dispatch(fetchPosts());
      }, 1000);
    }
  }, []);
  return (
    <>
      {status === 'loading' && (
        <div className="w-full h-screen flex items-center flex-col gap-4 justify-center transition">
          <h1>Идет загрузка</h1>
          <FaSpinner className="animate-spin w-10 h-10" />
        </div>
      )}
      {status === 'loaded' && (
        <div className="mt-[150px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {posts.map((post) => {
         
            return <OnePost post={post} />;
          })}
        </div>
      )}
      <div className=""></div>
    </>
  );
};

export default Home;
