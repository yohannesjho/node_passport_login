const express = require("express");

const routes = express.Router();

routes.get("/", (req, res) => res.render("welcome"));

//Register handle


module.exports = routes;
