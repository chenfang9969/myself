const Submission = require('../models/submissionModel');


exports.submitTool = async (req, res) => {
  const { name, url, logo, category, description } = req.body;
  if (!name || !url) return res.status(400).json({ message: '名称和链接为必填项' });

  try {
    await Submission.create({ name, url, logo });
    res.status(201).json({ message: '投稿成功，待管理员审核' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '提交失败' });
  }
};


exports.listPending = async (req, res) => {
  try {
    const [rows] = await Submission.findAllPending();
    res.json({ submissions: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '加载审核列表失败' });
  }
};

exports.approve = async (req, res) => {
  const { id } = req.params;
  try {
    await Submission.updateStatus(id, 'approved');
    res.json({ message: '已通过审核' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '审核操作失败' });
  }
};

exports.reject = async (req, res) => {
  const { id } = req.params;
  try {
    await Submission.updateStatus(id, 'rejected');
    res.json({ message: '已驳回投稿' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '操作失败' });
  }
};
