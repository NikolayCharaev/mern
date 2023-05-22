import { useEffect } from 'react';
import Header from './components/header';
import { Routes, Route } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import { useDispatch } from 'react-redux';
import Home from './components/home';
import FullPost from './components/fullPost';
import AddPost from './components/addPost';
import { fetchAuthMe } from './redux/slices/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthMe());
  });

  return (
    <div className="bg-appBg py-3 h-full min-h-screen w-full text-xl text-white px-3">
      <div className="container mx-auto">
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/newPost" element={<AddPost />} />
          <Route path="/posts/:id" element={<FullPost />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
