const db = require('../config/db');

const Submission = {
  create: ({ name, url, logo}) =>
    db.query(
      `INSERT INTO submissions (name, url, logo) VALUES (?, ?, ?)`,
      [name, url, logo]
    ),

  findAllPending: () =>
    db.query(`SELECT * FROM submissions WHERE status = 'pending' ORDER BY created_at DESC`),

  updateStatus: (id, status) =>
    db.query(`UPDATE submissions SET status = ? WHERE id = ?`, [status, id]),
};

module.exports = Submission;
