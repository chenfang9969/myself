import { useState } from "react";
import api from "../lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function SubmitTool() {
  const [form, setForm] = useState({
    name: "",
    url: "",
    logoFile: null, // 本地图片文件
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setForm((prev) => ({ ...prev, logoFile: files[0] })); // 文件是 files[0]
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.url || !form.logoFile) {
      alert("请填写完整信息并上传Logo！");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("url", form.url);
    formData.append("logo", form.logoFile); // 后端要能处理文件上传

    try {
      await api.post("/tools/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("提交成功！请等待管理员审核。");
      setForm({ name: "", url: "", logoFile: null });
    } catch (err) {
      console.error("提交失败：", err);
      alert("提交失败，请重试！");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">投稿 AI 工具</h1>
        <div className="space-y-4">
          <Input
            name="name"
            placeholder="工具名称"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            name="url"
            placeholder="工具链接"
            value={form.url}
            onChange={handleChange}
          />
          <Input
            name="logo"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />

          <Button className="w-full" onClick={handleSubmit}>
            提交
          </Button>
        </div>
        <p className="text-center mt-4">
          <Link to="/" className="text-blue-500">
            返回首页
          </Link>
        </p>
      </div>
    </div>
  );
}
