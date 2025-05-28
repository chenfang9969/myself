import React, { useEffect, useState } from "react";
import api from "../lib/api";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // 加载用户信息和收藏列表
  useEffect(() => {
    (async () => {
      try {
        // 获取用户信息
        const profileRes = await api.get("/auth/profile");
        setUser(profileRes.data.user);

        // 获取收藏列表
        const favRes = await api.get("/favorites");
        setFavorites(favRes.data.favorites);
      } catch (err) {
        console.error("加载个人中心失败", err);
      }
    })();
  }, []);

  // 取消收藏
  const handleUnfavorite = async (toolName) => {
    try {
      const res = await api.post("/favorites/toggle", { toolName });
      setFavorites((prev) =>
        prev.filter((name) => name !== toolName)
      );
    } catch (err) {
      console.error("取消收藏失败", err);
    }
  };

  if (!user) return <div className="p-8">加载中…</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* 用户信息 */}
        <div className="flex items-center gap-4">
          <img
            src={user.avatar || "/defaultAvatar.png"}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* 收藏列表 */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">我的收藏</h3>
          {favorites.length === 0 ? (
            <p className="text-gray-500">还没有收藏任何工具。</p>
          ) : (
            <ul className="space-y-2">
              {favorites.map((name) => (
                <li key={name} className="flex justify-between items-center">
                  <span>{name}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUnfavorite(name)}
                  >
                    取消收藏
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="text-center">
          <Link to="/">
            <Button>返回首页</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
