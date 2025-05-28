const db = require('../config/db');

// 获取所有工具 (Promise版本)
const getAllTools = async () => {
  const [rows] = await db.query('SELECT * FROM tools ORDER BY id DESC');
  return rows;
};

// 添加新工具
const addTool = async (tool) => {
  const [result] = await db.query(
    'INSERT INTO tools (name, url, category, description, tags, logo) VALUES (?, ?, ?, ?, ?, ?)',
    [tool.name, tool.url, tool.category, tool.description, tool.tags, tool.logo]
  );
  return result.insertId;
};

// 根据ID删除工具
const deleteToolById = async (id) => {
  const [result] = await db.query('DELETE FROM tools WHERE id = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  getAllTools,
  addTool,
  deleteToolById
};