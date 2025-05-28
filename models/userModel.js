const db = require('../config/db');

const User = {
  create: (username, email, password) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(sql, [username, email, password], (err, result) => {
        if (err) return reject(err);
        resolve({ id: result.insertId, username, email });
      });
    });
  },

  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE email = ?';
      db.query(sql, [email], (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  }
};

module.exports = User;
