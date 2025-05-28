import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import defaultAvatar from '../assets/vite.svg';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // 读取本地用户信息
  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) setUser(JSON.parse(saved));

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo / 首页链接 */}
        <Link to="/" className="text-purple-600 text-xl font-bold">
          AI 工具导航
        </Link>

        {/* 登录状态或头像菜单 */}
        {user ? (
          <div className="relative z-50" ref={menuRef}>
            <img
              src={user.avatar || defaultAvatar}
              alt="avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => {
                setMenuOpen((prev) => !prev);
              }}
            />
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md p-4 z-50">
                <div className="text-gray-800 font-semibold mb-1">
                  {user.username}
                </div>
                <div className="text-gray-500 text-sm mb-3">
                  {user.email}
                </div>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/change-password');
                  }}
                  className="w-full text-left text-blue-600 hover:underline mb-2"
                >
                  修改密码
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate('/submit');
                  }}
                  className="w-full text-left text-blue-600 hover:underline mb-2"
                >
                  我要投稿
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-600 hover:underline"
                >
                  退出登录
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <Link to="/login" className="text-green-600 font-medium mr-4">
              登录
            </Link>
            <Link to="/register" className="text-green-600 font-medium">
              注册
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
