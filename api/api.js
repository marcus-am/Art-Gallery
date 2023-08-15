const express = require('express');
const cors = require('cors');

const home = require("./routes/home");
const images = require("./routes/images");

const api = express();

api.use(cors());
api.use(express.json());

api.use("/", home)
api.use("/images", images)

module.exports = api;
