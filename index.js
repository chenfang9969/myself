const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const passwordRoutes = require("./routes/passwordRoutes");
const submitRoutes = require("./routes/submitRoutes");
const adminRoutes = require("./routes/adminRoutes");
const toolsRoutes = require('./routes/toolsRoutes');
const toolRoutes = require("./routes/toolRoutes");

dotenv.config();

const app = express();

app.use("/uploads", express.static("uploads")); 

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

// 密码管理
app.use("/api/password", passwordRoutes);

// 用户认证
app.use('/api/auth', authRoutes); 

// 用户收藏

app.use('/api/favorites', favoriteRoutes);

// 普通用户投稿
app.use('/api/submit', submitRoutes);

// 管理员审核
app.use('/api/admin', adminRoutes);

// 引入投稿路由
app.use("/api/tool", toolRoutes);

//添加工具列表
app.use('/api/tools', toolsRoutes);


app.get('/', (req, res) => {
  res.send('API 运行中');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`服务器正在端口 ${PORT} 运行`);
});
