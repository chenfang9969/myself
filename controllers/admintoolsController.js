const db = require('../config/db');

// 获取所有工具
exports.getAllTools = (req, res) => {
  const sql = 'SELECT * FROM tools';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// 删除工具
exports.deleteTool = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM tools WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: '工具已删除' });
  });
};

// 修改工具
exports.updateTool = (req, res) => {
  const { id } = req.params;
  const { name, description, url, icon } = req.body;
  const sql = 'UPDATE tools SET name = ?, description = ?, url = ?, icon = ? WHERE id = ?';
  db.query(sql, [name, description, url, icon, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: '工具信息已更新' });
  });
};

// 添加工具
exports.addTool = (req, res) => {
  const { name, description, url, icon } = req.body;
  const sql = 'INSERT INTO tools (name, description, url, icon) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, description, url, icon], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: '新工具已添加', id: result.insertId });
  });
};
