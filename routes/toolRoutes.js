const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../config/db");

const router = express.Router();

// 设置图片上传位置和规则
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 图片保存到项目的 uploads 文件夹下
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage });

// 投稿路由，带图片上传
router.post("/submit", upload.single("logo"), async (req, res) => {
  const { name, url } = req.body;
  const logoPath = req.file ? `/uploads/${req.file.filename}` : null; // 返回图片的访问路径

  if (!name || !url || !logoPath) {
    return res.status(400).json({ msg: "请填写完整信息" });
  }

  try {
    await db.query(
      "INSERT INTO submissions (name, url, logo) VALUES (?, ?, ?)",
      [name, url, logoPath]
    );
    res.status(201).json({ msg: "投稿成功，等待审核" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "服务器错误" });
  }
});

module.exports = router;
