import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminTools = () => {
  const [tools, setTools] = useState([]);
  const [editingTool, setEditingTool] = useState(null);
  const [newTool, setNewTool] = useState({ 
    name: '', 
    description: '', 
    url: '', 
    icon: '',
    tags: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 配置axios实例
  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  });

  // 获取工具列表
  const fetchTools = async () => {
    try {
      setLoading(true);
      const response = await api.get('/tools');
      const formattedTools = response.data.map(tool => ({
        ...tool,
        tags: Array.isArray(tool.tags) ? tool.tags : tool.tags.split(',')
      }));
      setTools(formattedTools);
      setError('');
    } catch (err) {
      console.error('获取工具失败:', err);
      setError('无法加载工具数据');
      toast.error('数据加载失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  // 删除工具
  const handleDelete = async (id) => {
    if (!window.confirm('确定要删除这个工具吗？')) return;
    try {
      await api.delete(`/tools/${id}`);
      await fetchTools();
      toast.success('删除成功');
    } catch (err) {
      console.error('删除失败:', err);
      toast.error('删除操作失败');
    }
  };

  // 保存修改
  const handleSaveEdit = async () => {
    try {
      const payload = {
        ...editingTool,
        tags: editingTool.tags.join(',') 
      };
      
      await api.put(`/tools/${editingTool.id}`, payload);
      setEditingTool(null);
      await fetchTools();
      toast.success('修改已保存');
    } catch (err) {
      console.error('保存失败:', err);
      toast.error('保存失败，请检查数据');
    }
  };

  // 添加新工具
  const handleAddTool = async () => {
    try {
      if (!newTool.name.trim()) {
        toast.warning('工具名称不能为空');
        return;
      }

      const payload = {
        ...newTool,
        tags: newTool.tags.join(',')
      };

      await api.post('/tools', payload);
      setNewTool({ 
        name: '', 
        description: '', 
        url: '', 
        icon: '',
        tags: []
      });
      await fetchTools();
      toast.success('工具添加成功');
    } catch (err) {
      console.error('添加失败:', err);
      toast.error('添加失败，请重试');
    }
  };

  // 渲染加载状态
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* 头部标题 */}
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl text-gray-800">管理员后台</h1>
      </div>

      {/* 添加新工具表单 */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">添加新工具</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['name', 'description', 'url', 'icon'].map((field) => (
            <div key={field} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field === 'icon' ? '图标地址' : field}
              </label>
              <input
                type="text"
                placeholder={`输入${field}`}
                value={newTool[field]}
                onChange={(e) => setNewTool({ ...newTool, [field]: e.target.value })}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
             
            </div>
          ))}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">标签（逗号分隔）</label>
            <input
              type="text"
              placeholder="输入标签，例如：AI,工具"
              value={newTool.tags.join(',')}
              onChange={(e) => setNewTool({ 
                ...newTool, 
                tags: e.target.value.split(',').map(t => t.trim())
              })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={handleAddTool}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          添加工具
        </button>
      </div>

      {/* 工具列表表格 */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              {['ID', '名称', '描述', '链接', '图标', '标签', '操作'].map((header) => (
                <th 
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tools.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  暂无工具数据
                </td>
              </tr>
            ) : tools.map((tool) => (
              <tr key={tool.id} className="hover:bg-gray-50 transition-colors">
                {/* ID */}
                <td className="px-6 py-4 text-sm text-gray-900">{tool.id}</td>
                
                {/* 名称 */}
                <td className="px-6 py-4">
                  {editingTool?.id === tool.id ? (
                    <input
                      value={editingTool.name}
                      onChange={(e) => setEditingTool({ ...editingTool, name: e.target.value })}
                      className="w-full p-1 border rounded-md"
                    />
                  ) : (
                    <span className="font-medium">{tool.name}</span>
                  )}
                </td>

                {/* 描述 */}
                <td className="px-6 py-4 max-w-xs">
                  {editingTool?.id === tool.id ? (
                    <textarea
                      value={editingTool.description}
                      onChange={(e) => setEditingTool({ ...editingTool, description: e.target.value })}
                      className="w-full p-1 border rounded-md h-20"
                    />
                  ) : (
                    <div className="text-gray-600 truncate" title={tool.description}>
                      {tool.description}
                    </div>
                  )}
                </td>

                {/* 链接 */}
                <td className="px-6 py-4">
                  {editingTool?.id === tool.id ? (
                    <input
                      value={editingTool.url}
                      onChange={(e) => setEditingTool({ ...editingTool, url: e.target.value })}
                      className="w-full p-1 border rounded-md"
                    />
                  ) : (
                    <a
                      href={tool.url}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      访问链接
                    </a>
                  )}
                </td>

                {/* 图标 */}
                <td className="px-6 py-4">
                  {editingTool?.id === tool.id ? (
                    <input
                      value={editingTool.icon}
                      onChange={(e) => setEditingTool({ ...editingTool, icon: e.target.value })}
                      className="w-full p-1 border rounded-md"
                    />
                  ) : (
                    <img
                      src={tool.icon}
                      className="h-10 w-10 object-contain mx-auto"
                      onError={(e) => {
                        e.target.src = '/default-icon.png';
                      }}
                    />
                  )}
                </td>

                {/* 标签 */}
                <td className="px-6 py-4">
                  {editingTool?.id === tool.id ? (
                    <input
                      value={editingTool.tags.join(',')}
                      onChange={(e) => setEditingTool({ 
                        ...editingTool, 
                        tags: e.target.value.split(',').map(t => t.trim())
                      })}
                      className="w-full p-1 border rounded-md"
                    />
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {tool.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </td>

                {/* 操作按钮 */}
                <td className="px-6 py-4 space-x-2">
                  {editingTool?.id === tool.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        保存
                      </button>
                      <button
                        onClick={() => setEditingTool(null)}
                        className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                      >
                        取消
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingTool({ ...tool })}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDelete(tool.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        删除
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4"> 
        <p to="/admin" className="text-blue-600">
            返回管理员主页
        </p>
      </div>
    </div>
  );
};

export default AdminTools;