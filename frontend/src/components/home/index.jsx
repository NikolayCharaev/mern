import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../../redux/slices/posts';
import { FaSpinner } from 'react-icons/fa';
import { AiFillEye } from 'react-icons/ai';

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const status = useSelector((state) => state.posts.status);

  useEffect(() => {
    setTimeout(() => {
      dispatch(fetchPosts());
    }, 1000);
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
            return (
              <>
                <Link to={`/posts/${post._id}`}>
                  <div
                    className="bg-cardBg p-10 grid-item flex-grow rounded cursor-pointer active:bg-blue-300 transition"
                    key={post.id}>
                    <h2 className="text-left inline-block p-4 bg-slate-500 rounded text-white text-2xl mb-4 w-56 overflow-hidden text-ellipsis whitespace-nowrap">
                      {post.title}
                    </h2>
                    <p className="w-[80%] overflow-hidden text-ellipsis whitespace-nowrap">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-1 justify-between my-4 p-2 bg-blue-200 text-black rounded">
                      <div className="">
                        <p>{post.user.username}</p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <p>{post.viewsCount}</p>
                        <AiFillEye />
                      </div>
                    </div>
                  </div>
                </Link>
              </> 
            );
          })}
        </div>
      )}
      <div className=""></div>
    </>
  );
};

export default Home;
