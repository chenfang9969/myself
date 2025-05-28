// src/components/UserMenu.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/touxiang.jpg";

export default function UserMenu({ user: propUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(propUser || null);
  const menuRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!propUser) {
      const saved = localStorage.getItem('user');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } else {
      setUser(propUser);
    }
  }, [propUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  //管理员入口
  const handleAdminButtonClick = () => {
    setMenuOpen(false);
    navigate('/admin');
  };

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <img
        src={user.avatar || defaultAvatar}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover cursor-pointer"
        onClick={() => setMenuOpen((prev) => !prev)}
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
            className="w-full text-left text-gray-900 hover:underline mb-2"
          >
            修改密码
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate('/submit');
            }}
            className="w-full text-left text-gray-900 hover:underline mb-2"
          >
            我要投稿AI工具
          </button>
          {user.role === "admin" && (
            <button
              onClick={handleAdminButtonClick}
              className="w-full text-left text-gray-900 hover:underline mb-2"
            >
              管理后台
            </button>
          )}
          <button
            onClick={handleLogout}
            className="w-full text-left text-gray-900 hover:underline"
          >
            退出登录
          </button>
        </div>
      )}
    </div>
  );
}
