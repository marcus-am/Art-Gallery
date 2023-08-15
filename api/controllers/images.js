const Image = require('../models/images');

async function index (req, res) {
    try {
        const images = await Image.getAll();
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({"error": error.message})
    }
}

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const image = await Image.getById(id);
        res.status(200).json(image);
    } catch (error) {
        res.status(404).json({"error": error.message})
    }
}

async function create (req, res) {
    try {
        const data = req.body;
        data.image_type = req.file.mimetype;
        data.image_data = req.file.buffer;
        const result = await Image.create(data);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({"error": error.message})
    }
}

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        data.image_type = req.file.mimetype;
        data.image_data = req.file.buffer;
        const updatedImage = await Image.update(id, data);
        res.status(200).json(updatedImage);
    } catch (error) {
        res.status(500).json({"error": error.message})
    }
}

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const image = await Image.getById(id);
        const result = await image.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

module.exports = { index, show, create, update, destroy };