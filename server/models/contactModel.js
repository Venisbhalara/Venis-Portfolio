const db = require('../config/db');

class ContactModel {
  static async create({ name, email, message }) {
    const [result] = await db.query(
      'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
      [name.trim(), email.trim(), message.trim()]
    );
    return result;
  }
}

module.exports = ContactModel;
