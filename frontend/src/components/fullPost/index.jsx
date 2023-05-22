import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';

import { FaSpinner } from 'react-icons/fa';
import { BiErrorCircle } from 'react-icons/bi';
import {AiFillEye} from 'react-icons/ai'

const FullPost = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`/posts/${id}`)
        .then((post) => {
          setData(post.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          console.log(err);
        });
    }, 1500);
  }, []);
  return (
    <>
      {loading && (
        <div className="w-full h-screen flex items-center flex-col gap-4 justify-center transition">
          <h1>Идет загрузка</h1>
          <FaSpinner className="animate-spin w-10 h-10" />
        </div>
      )}
      {error && (
        <div className="w-full h-screen flex items-center flex-col gap-4 justify-center transition">
          <h1>Произошла ошибка</h1>
          <BiErrorCircle />
        </div>
      )}
      {data && data.user && (
        <div className="w-3/6 mx-auto min-h-[800px] mt-16 bg-fullCardBg p-10 rounded flex flex-col justify-between">
          <h2 className="inline-block p-4 bg-slate-500 rounded text-white text-2xl text-center">
            {data.title}
          </h2>
          <p className="">
            {data.description}
          </p>
          <div className="flex items-center gap-1 justify-between my-4 p-2 bg-blue-200 text-black rounded">
            <div className="">
              <p>{data.user.username}</p>
            </div>
            <div className="flex gap-1 items-center">
              <p>{data.viewsCount}</p>
              <AiFillEye />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FullPost;
