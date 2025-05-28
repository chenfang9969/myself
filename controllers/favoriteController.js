const { addFavorite, removeFavorite, getFavorites } = require('../models/favoriteModel');

exports.toggleFavorite = async (req, res) => {
  const userId = req.user.id;
  const { toolName } = req.body;
  try {
    // 先检查是否已收藏
    const [rows] = await getFavorites(userId);
    const isFav = rows.some(r => r.tool_name === toolName);

    if (isFav) {
      await removeFavorite(userId, toolName);
      return res.json({ message: '已取消收藏', favorite: false });
    } else {
      await addFavorite(userId, toolName);
      return res.json({ message: '已添加收藏', favorite: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '操作失败' });
  }
};

exports.listFavorites = async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await getFavorites(userId);
    res.json({ favorites: rows.map(r => r.tool_name) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '获取收藏失败' });
  }
};
