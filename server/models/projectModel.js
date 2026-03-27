const db = require('../config/db');

class ProjectModel {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM projects ORDER BY sort_order ASC');
    // Parse JSON strings back to arrays if needed
    return rows.map(p => ({
      ...p,
      tech_stack: typeof p.tech_stack === 'string' ? JSON.parse(p.tech_stack) : p.tech_stack,
    }));
  }
}

module.exports = ProjectModel;
