import Header from './components/header';
import { Routes, Route } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home'

function App() {
  return (
    <div className="bg-appBg h-screen w-full text-xl text-white">
      <div className="container mx-auto">
        <Header />

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
