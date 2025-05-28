const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');        // JWT 中间件
const verifyAdmin = require('../middleware/verifyAdmin');        // 角色校验中间件
const { listPending, approve, reject } = require('../controllers/submissionController');
const { adminLogin } = require('../controllers/adminController');
const admintoolsController = require('../controllers/admintoolsController');

// 所有 admin 路由都要先通过身份验证和角色校验
router.use(verifyToken, verifyAdmin);

// POST /api/admin/login
router.post('/login', adminLogin);

// GET  /api/admin/submissions
router.get('/submissions', listPending);

// 接受投稿
router.post('/submissions/:id/approve', approve);

// 拒绝投稿
router.post('/submissions/:id/reject', reject);

// 获取所有工具
router.get('/tools', admintoolsController.getAllTools);

// 添加工具
router.post('/tools', admintoolsController.addTool);

// 修改工具
router.put('/tools/:id', admintoolsController.updateTool);

// 删除工具
router.delete('/tools/:id', admintoolsController.deleteTool);

module.exports = router;
