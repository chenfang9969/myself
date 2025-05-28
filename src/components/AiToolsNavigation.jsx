import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, StarOff } from "lucide-react"; 
import tools from "../data/tools.js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import api from "../lib/api.js";

export default function AIToolsNavigation() {
  const [search, setSearch] = useState("");
  const [selectedCategory] = useState("All");
  const [favorites, setFavorites] = useState({});
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);

  // 从 后端 加载收藏状态
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/favorites");
        const favs = res.data.favorites.reduce(
          (acc, name) => ({ ...acc, [name]: true }),
          {}
        );
        setFavorites(favs);
      } catch (err) {
        console.error("加载收藏失败", err);
      }
    })();
  }, []);

  // 当收藏状态改变时，更新 localStorage
  const toggleFavorite = async (toolName) => {
    try {
      const res = await api.post("/favorites/toggle", { toolName });
      setFavorites((prev) => ({
        ...prev,
        [toolName]: res.data.favorite,
      }));
    } catch (err) {
      console.error("收藏切换失败", err);
    }
  };


  // 根据搜索和分类过滤工具
  const filteredTools = tools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    const isFavorite = favorites[tool.name];

    if (showOnlyFavorites) {
      return matchesSearch && matchesCategory && isFavorite;
    }

    return matchesSearch && matchesCategory;
  });

  //全网搜索
  const handleSearch = () => {
    if (!search.trim()) return; // 空搜索不执行
    const query = encodeURIComponent(search);
    window.open(`https://www.google.com/search?q=${query}`, '_blank'); // 新标签页打开
  };


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI 工具导航</h1>

      {/* 搜索框 */}
      <div className="flex items-center gap-2 mb-4">
        <Input
          autoFocus 
          placeholder="搜索 AI 工具..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
        <Button variant="outline" onClick={handleSearch}>
          <Search className="w-5 h-5" />
        </Button>
      </div>

      {/* 只看收藏 */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={!showOnlyFavorites ? "default" : "outline"}
          onClick={() => setShowOnlyFavorites(false)}
        >
          全部
        </Button>
        <Button
          variant={showOnlyFavorites ? "default" : "outline"}
          onClick={() => setShowOnlyFavorites(true)}
        >
          收藏
        </Button>
      </div>

      {/* 工具列表 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredTools.map((tool) => (
          <Card
            key={tool.name}
            className="p-4 relative cursor-pointer"
            onClick={() => setSelectedTool(tool)}
          >
            <img
              src={tool.logo}
              alt={tool.name}
              className="w-10 h-10 bg-white rounded-full p-1 shadow"
              onError={(e) => {
                e.target.onerror = null; // 防止循环触发
                e.target.src = "https://cdn-icons-png.flaticon.com/512/4712/4712078.png"; // 默认 icon 链接
              }}
            />
            {/* 收藏按钮 */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // 阻止事件冒泡，防止触发弹窗
                toggleFavorite(tool.name);
              }}
              className="absolute top-2 right-2 text-yellow-500"
              title={favorites[tool.name] ? "取消收藏" : "添加收藏"}
            >
              {favorites[tool.name] ? <Star /> : <StarOff />}
            </button>
            <CardContent>
              <div className="flex items-center mb-2">
                <h2 className="text-lg font-semibold">{tool.name}</h2>
              </div>
              <p className="text-sm text-gray-500">{tool.category}</p>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline block mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                访问
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 对话框 */}
      <Dialog open={!!selectedTool} onOpenChange={() => setSelectedTool(null)}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedTool && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <img
                    src={selectedTool.logo}
                    alt={selectedTool.name}
                    className="w-8 h-8 rounded"
                  />
                  <span>{selectedTool.name}</span>
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-500">
                  {selectedTool.category}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-4">
                {/* 描述 */}
                <p className="text-sm text-gray-600">{selectedTool.description}</p>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2">
                  {selectedTool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* 访问按钮 */}
                <a
                  href={selectedTool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  访问工具
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
