import { useState } from 'react';
import CustomButton from '../custom/button';
import { useForm } from 'react-hook-form';
import { FaSpinner } from 'react-icons/fa';


import { BiErrorAlt } from 'react-icons/bi';
import {AiFillCheckCircle} from 'react-icons/ai'

import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../../redux/slices/posts';

const AddPost = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { addPostStatus } = useSelector((state) => state.posts);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    (values);
    setLoading(true);
    setTimeout(() => {
      dispatch(fetchPost(values));
      setLoading(false);
    }, 1500);

    reset();
  };

  return (
    <div className="mt-20">
      {loading && (
        <div className="flex items-center gap-4 justify-center transition">
          <h1>Идет загрузка</h1>
          <FaSpinner className="animate-spin w-10 h-10" />
        </div>
      )}
      {addPostStatus === 'error' && !loading && (
        <div className=" flex items-center gap-4 justify-center transition">
          <h1>Произошла ошибка. Проверьте правильность введенных данных</h1>
          <BiErrorAlt />
        </div>
      )}
        {addPostStatus === 'loaded'  && (
        <div className=" flex items-center gap-4 justify-center transition">
          <h1>Статья успешно добавлена</h1>
          <AiFillCheckCircle />
        </div>
      )}
      <form
        className="p-7 border border-white rounded mx-auto max-w-3xl flex flex-col gap-4 items-start mt-28"
        onSubmit={handleSubmit(onSubmit)}>
        <label className="text-center w-full">Добавить статью</label>
        <div className="w-full">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={'введите заголовок'}
            {...register('title', {
              required: 'поле обязательно для заполнения',
              minLength: {},
            })}
          />
          {(errors.title?.type === 'required' || errors.title?.type === 'pattern') && (
            <p className="text-sm text-red-500 mt-2">{errors.title.message}</p>
          )}
        </div>

        <div className="w-full">
          <textarea
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={'введите текст'}
            {...register('description', {
              required: 'Поле обязательно для заполнения',
              minLength: {
                value: 4,
                message: 'Слишком мало текста',
              },
            })}
          />
          {(errors.description?.type === 'required' ||
            errors.description?.type === 'minLength') && (
            <p className="text-sm text-red-500 mt-2">{errors.description.message}</p>
          )}
        </div>

        <CustomButton text={'добавить'} type="submit" />
      </form>
    </div>
  );
};

export default AddPost;
