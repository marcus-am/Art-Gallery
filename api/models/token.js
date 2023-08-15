const db = require('../database/setup.js');

const { v4: uuidv4 } = require("uuid");

class Token {

    constructor({ token_id, user_id, token}) {
        this.token_id = token_id,
        this.user_id = user_id,
        this.token = token;
    }

    static async create(user_id) {
        const token = uuidv4();
        const response = await db.query("INSERT INTO token (user_id, token) VALUES ($1, $2) RETURNING token_id", [user_id, token]);
        const newId = response.rows[0].token_id;
        const newToken = await Token.getOneById(newId);
        return newToken;
    }
}