const db = require('../database/connect');

class User {

    constructor({user_id, username, password, is_admin}) {
        this.id = user_id,
        this.username = username,
        this.password = password,
        this.is_admin = is_admin
    }
static async getOneById(id) {
    const response = await db.query("SELECT * FROM user_account WHERE user_id = $1", [id]);
    if(response.rows.length != 1) {
        throw new Error("unable to locate user by ID")
        }
        return new User(response.rows[0]);
    }
}

module.exports = User;


