const express = require('express');
const cors = require('cors');

const home = require("./routes/home");

const api = express();

api.use(cors());
api.use(express.json());

api.use("/", home)

module.exports = api;
