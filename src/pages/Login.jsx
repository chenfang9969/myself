import React, { useState } from "react";
import axios from "axios";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const { token, user } = response.data;

      // 存储 token 和 user 信息
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // 根据角色跳转
      if (user.role === "admin") {
        console.log("欢迎进入管理员页面");
        navigate("/admin");
      } else {
        console.log("登录成功：", user);
        navigate("/");
      }
    } catch (error) {
      console.error("登录失败：", error);
      alert(error.response?.data?.msg || error.response?.data?.message || "登录失败，请重试");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">登录</h2>
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="w-full" onClick={handleLogin}>
            登录
          </Button>
        </div>
        <p className="text-center mt-4 text-sm">
          还没有账号？ <Link to="/register" className="text-blue-500">注册</Link>, <Link to="/" className="text-blue-500">返回首页</Link>
        </p>
      </div>
    </div>
  );
}
