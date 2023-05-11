import { useEffect } from 'react';
import axios from '../../axios';
const Home = () => {
  useEffect(() => {
    axios.get('/posts').then((data) => console.log(data));
  }, []);
  return <div>Home</div>;
};

export default Home;
