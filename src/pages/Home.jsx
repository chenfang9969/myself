import '../App.css';
import AIToolsNavigation from '../components/AiToolsNavigation';
import backgrounds from '../data/backgrounds';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import UserMenu from '../components/UserMenu';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';

function App() {
  const [bgUrl, setBgUrl] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    changeBackground();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const changeBackground = () => {
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBgUrl(randomBg);
  };

  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // backgroundAttachment: 'fixed',
        transition: 'background-image 1s ease-in-out',
      }}
    >
      {/* 顶部导航栏 */}
      <header className="fixed top-0 left-0 w-full z-50 bg-transparent py-4">
        <div className="flex justify-between items-center px-4">
          {/* 更换背景 */}
          <button
            onClick={changeBackground}
            className="text-black font-bold py-2 px-4 rounded"
          >
            更换背景
          </button>

          {/* 登录状态 */}
          {user ? (
            <UserMenu user={user} onLogout={handleLogout} />
          ) : (
            <Link to="/login">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                登录 / 注册
              </button>
            </Link>
          )}
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="relative z-10 pt-28 pb-8 flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-6">
          <AIToolsNavigation />
        </div>
      </main>
    </div>
  );
}

export default App;
