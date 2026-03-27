const db = require('../config/db');

class SkillModel {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM skills ORDER BY sort_order ASC');
    return rows;
  }
}

module.exports = SkillModel;
