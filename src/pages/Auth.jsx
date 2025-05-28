import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const toggleForm = () => setIsLogin(!isLogin);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Login with", formData);
    } else {
      console.log("Register with", formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isLogin ? "登录" : "注册"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <Input
              name="username"
              placeholder="用户名"
              value={formData.username}
              onChange={handleChange}
              required
            />
          )}
          <Input
            name="email"
            type="email"
            placeholder="邮箱"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="密码"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button className="w-full" type="submit">
            {isLogin ? "登录" : "注册"}
          </Button>
        </form>
        <p className="text-sm text-center mt-4">
          {isLogin ? "还没有账号？" : "已有账号？"}{" "}
          <button
            type="button"
            onClick={toggleForm}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "去注册" : "去登录"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
