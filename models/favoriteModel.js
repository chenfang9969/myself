const db = require('../config/db');

const addFavorite = (userId, toolName) =>
  db.query(
    'INSERT IGNORE INTO favorites (user_id, tool_name) VALUES (?, ?)',
    [userId, toolName]
  );

const removeFavorite = (userId, toolName) =>
  db.query(
    'DELETE FROM favorites WHERE user_id = ? AND tool_name = ?',
    [userId, toolName]
  );

const getFavorites = (userId) =>
  db.query(
    'SELECT tool_name FROM favorites WHERE user_id = ?',
    [userId]
  );

module.exports = {
  addFavorite,
  removeFavorite,
  getFavorites,
};
