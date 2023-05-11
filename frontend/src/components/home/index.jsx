import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../redux/slices/posts';
import { FaSpinner } from 'react-icons/fa';

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const status = useSelector((state) => state.posts.status);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchPosts());
    }, 5000);
  }, []);
  return (
    <>
      {status === 'loading' && (
        <div className="w-full h-screen flex items-center flex-col gap-4 justify-center transition">
            <h1>Идет загрузка</h1>
          <FaSpinner className="animate-spin w-10 h-10" />
        </div>
      )}
      <div className=""></div>
    </>
  );
};

export default Home;
