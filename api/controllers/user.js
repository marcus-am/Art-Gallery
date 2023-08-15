// const require('bcrypt');
const User = require('../models/user');

const register = async (req, res) => {
    const data = req.body;
    res.status(200).send(data)
}

const login = async (req, res) => {
    const data = req.body;
    res.status(200).send(data)
}

module.exports = { register, login }