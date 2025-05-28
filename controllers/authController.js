const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const changePassword = async (req, res) => {
  const userId = req.user.id;               // from verifyToken 中间件
  const { oldPassword, newPassword } = req.body;

  try {
    // 1. 查询用户当前密码
    const [rows] = await db.query("SELECT password FROM users WHERE id = ?", [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "用户不存在" });
    }

    // 2. 验证旧密码
    const user = rows[0];
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(401).json({ message: "原密码错误" });
    }

    // 3. 更新为新密码
    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE users SET password = ? WHERE id = ?", [hashed, userId]);

    res.json({ message: "密码修改成功" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "修改密码失败" });
  }
};

const register = async (req, res) => {
  const { username,email, password } = req.body;
  
  if (!username||!email || !password) {
    return res.status(400).json({ msg: '请填写所有字段' });
  }


  try {
    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: '该邮箱已被注册' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [
      username,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: '注册成功' });
  } catch (error) {
    console.error('注册错误：', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [results] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (results.length === 0) {
      return res.status(401).json({ msg: '用户不存在' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: '密码错误' });
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        role: user.role 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    });

  } catch (err) {
    console.error('登录出错：', err);
    return res.status(500).json({ msg: '服务器错误' });
  }
};


module.exports = {
  register,
  login,
  changePassword
};
