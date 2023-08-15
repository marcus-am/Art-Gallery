const express = require('express');
const cors = require('cors');

const home = require("./routes/home");
const userRouter = require("./routes/user");

const api = express();

api.use(cors());
api.use(express.json());

api.use("/", home);
api.use("/users", userRouter);

module.exports = api;
