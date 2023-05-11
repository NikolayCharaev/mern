import Header from './components/header';
import { Routes, Route } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';

function App() {
  return (
    <div className="bg-appBg h-screen w-full text-xl text-white">
      <div className="container mx-auto">
        <Header />

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
