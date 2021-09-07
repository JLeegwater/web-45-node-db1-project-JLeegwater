const express = require("express");
const AccountRouter = require("./accounts/accounts-router");
const morgan = require("morgan");

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use("/api/accounts", AccountRouter);

server.use("*", (req, res) => {
  res.status(404).json({
    message: "not found",
  });
});

module.exports = server;
