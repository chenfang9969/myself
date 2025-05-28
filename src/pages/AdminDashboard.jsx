import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { Button } from "@/components/ui/button";
import ToolForm from "../components/ToolForm"; 

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [toolsCount, setToolsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      fetchSubmissions();
      fetchStats();
    }
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await api.get("/admin/submissions");
      setSubmissions(res.data);
    } catch (err) {
      console.error("获取投稿失败:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setToolsCount(res.data.tools);
      setUsersCount(res.data.users);
    } catch (err) {
      console.error("统计数据获取失败:", err);
    }
  };

  const handleApprove = async (id) => {
    await api.post(`/admin/approve/${id}`);
    fetchSubmissions();
  };

  const handleReject = async (id) => {
    await api.post(`/admin/reject/${id}`);
    fetchSubmissions();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">管理员后台</h1>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="text-xl font-semibold">已发布工具数</h2>
          <p className="text-2xl text-purple-600 mt-2">{toolsCount}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="text-xl font-semibold">注册用户数</h2>
          <p className="text-2xl text-green-600 mt-2">{usersCount}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">AI 工具投稿审核</h2>
      {submissions.length === 0 ? (
        <p className="text-gray-500">暂无待审核投稿</p>
      ) : (
        submissions.map((tool) => (
          <div key={tool.id} className="border p-4 mb-4 rounded shadow">
            <div className="flex justify-between">
              <div>
                <h2 className="font-bold text-lg">{tool.name}</h2>
                <p className="text-sm text-gray-500">{tool.url}</p>
                <p className="text-sm">{tool.description}</p>
                <p className="text-sm text-gray-400 mt-1">分类: {tool.category}</p>
              </div>
              <img src={tool.logo} alt="logo" className="w-12 h-12 object-contain ml-4" />
            </div>
            <div className="mt-3 space-x-2">
              <Button onClick={() => handleApprove(tool.id)}>通过</Button>
              <Button variant="destructive" onClick={() => handleReject(tool.id)}>拒绝</Button>
            </div>
          </div>
        ))
      )}

      <h2 className="text-2xl font-bold my-6">在线添加新工具</h2>
      <ToolForm onSuccess={fetchStats} />
    </div>
  );
}
