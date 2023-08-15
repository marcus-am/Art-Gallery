const db = require('../database/connect');
const Buffer = require('buffer/').Buffer

class Image {
    constructor({image_id, image_title, image_description, image_type, image_data}) {
        this.id = image_id;
        this.title = image_title;
        this.description = image_description;
        this.image_type = image_type;
        this.image_data = Buffer.from(image_data).toString('base64');
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM images");
        return response.rows.map(i => new Image(i));
    }

    static async getById(id) {
        const response = await db.query("SELECT * FROM images WHERE image_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate image.")
        }
        return new Image(response.rows[0]);
    }

    static async create(data) {
        const { title, description, image_type, image_data } = data;
        const response = await db.query("INSERT INTO images (image_title, image_description, image_type, image_data) VALUES ($1, $2, $3, $4) RETURNING *", 
        [title, description, image_type, image_data]);

        const newId = response.rows[0].image_id;
        const newImage = await Image.getById(newId);
        return newImage;
    }

    static async update(id, data) {
        const { title, description, image_type, image_data } = data;
        console.log('yes')
        const response = await db.query("UPDATE images SET image_title = $1, image_description = $2, image_type = $3, image_data = $4 WHERE image_id = $4 RETURNING *", 
        [title, description, image_type, image_data, id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate image.")
        }
        return new Image(response.rows[0]);
    }

    async destroy() {
        let response = await db.query("DELETE FROM images WHERE image_id = $1 RETURNING *;", [this.id]);
        return new Image(response.rows[0]);
    }
}

module.exports = Image;