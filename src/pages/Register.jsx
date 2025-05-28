import React, { useState } from "react";
import axios from "axios";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      console.log("注册成功：", response.data);
      alert("注册成功，请登录");
      navigate("/login");
    } catch (error) {
      console.error("注册失败：", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "注册失败，请重试");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">注册</h2>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <Button className="w-full" onClick={handleRegister}>注册</Button>
        </div>
        <p className="text-center mt-4 text-sm">
          已有账号？ <Link to="/login" className="text-blue-500">登录</Link>, <Link to="/" className="text-blue-500">返回首页</Link>
        </p>
      </div>
    </div>
  );
}
