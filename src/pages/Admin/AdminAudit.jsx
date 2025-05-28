import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/api";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";

export default function Admin() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    // 获取待审核投稿列表
    const fetchPendingSubmissions = async () => {
      try {
        const response = await api.get("/admin/submissions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSubmissions(response.data.submissions);
  
        const token = localStorage.getItem("token");// 使用jwtDecode
      } catch (err) {
        console.error("加载失败:", err);
        alert("加载审核列表失败");
        
        // 新增：调试错误时的Token
        const token = localStorage.getItem("token");
        if (token) {
          console.log("当前Token:", jwtDecode(token));
        } else {
          console.log("未找到Token");
        }
      } finally {
        setLoading(false);
      }
    };
  
    // 处理审核操作
    const handleReview = async (id, action) => {
      try {
        await api.post(`/admin/submissions/${id}/${action}`);
        // 更新本地状态（移除已处理的投稿）
        setSubmissions(submissions.filter(sub => sub.id !== id));
        alert(`操作成功：已${action === 'approve' ? '通过' : '驳回'}`);
      } catch (err) {
        console.error("操作失败:", err);
        alert("操作失败，请重试");
      }
    };
  
    useEffect(() => {
      fetchPendingSubmissions();
    }, []);
  
    if (loading) return <div className="p-4">加载中...</div>;
  
    return (
        <div className="container mx-auto p-4">    
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">投稿审核</h2>
            {submissions.length === 0 ? (
              <p className="text-gray-500">暂无待审核的投稿</p>
            ) : (
              <div className="space-y-4">
                {submissions.map((sub) => (             
                  <div
                    key={sub.id}
                    className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      {sub.logo && (
                        <img
                          src={`http://localhost:5000${sub.logo}`}
                          alt="Logo"
                          className="w-16 h-16 object-contain rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{sub.name}</h3>
                        <a
                          href={sub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {sub.url}
                        </a>
                        {sub.description && (
                          <p className="text-gray-600 mt-2">{sub.description}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button
                        className="bg-green-500"
                        variant="success"
                        onClick={() => handleReview(sub.id, "approve")}
                      >
                        通过
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleReview(sub.id, "reject")}
                      >
                        驳回
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p>
          <Link to="/" className="text-blue-500 mb-4 inline-block">
            返回主页,
          </Link>
          <Link to="/admin" className="text-blue-500 mb-4 inline-block">
            返回管理员主页
          </Link>
            </p>
          </div>
        </div>
      );
    }