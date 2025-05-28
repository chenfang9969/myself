const toolsModel = require('../models/toolsModel');

// 获取所有工具 (async/await版本)
const getAllTools = async (req, res) => {
  try {
    const results = await toolsModel.getAllTools();
    res.json(results);
  } catch (err) {
    console.error('数据库查询错误:', err);
    res.status(500).json({ error: '内部服务器错误' });
  }
};

// 添加新工具
const addTool = async (req, res) => {
  try {
    const { name, url, category, description, tags, logo } = req.body;
    
    if (!name || !url) {
      return res.status(400).json({ error: '名称和网址为必填字段' });
    }

    const insertId = await toolsModel.addTool({ name, url, category, description, tags, logo });
    res.json({ message: '工具添加成功', id: insertId });
  } catch (err) {
    console.error('添加工具错误:', err);
    res.status(500).json({ error: err.message });
  }
};

// 删除工具
const deleteTool = async (req, res) => {
  try {
    const toolId = req.params.id;
    const affectedRows = await toolsModel.deleteToolById(toolId);
    
    if (affectedRows === 0) {
      return res.status(404).json({ error: '未找到指定工具' });
    }
    
    res.json({ message: '工具删除成功' });
  } catch (err) {
    console.error('删除工具错误:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllTools,
  addTool,
  deleteTool
};