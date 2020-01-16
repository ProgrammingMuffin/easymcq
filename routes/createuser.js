const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const VARS = require('../VARS')();
const modelUser = require('../models/user');


const orm = new Sequelize(VARS.db, VARS.username, VARS.password, {
    host: VARS.host,
    dialect: VARS.dialect
});

const User = modelUser(orm);

const createUser = (username, name, email, phone, DOB, collegename, degree) => {
    User.create({username: username, name: name, email: email, phone: phone, DOB: DOB, college_name: collegename, degree: degree});
}

router.post("/create", (req, res) => {
    var username = req.body.username;
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var DOB = req.body.dob;
    var collegename = req.body.collegename;
    var degree = req.body.degree;
    createUser(username, name, email, phone, DOB, collegename, degree);
    res.status(200).send("Done.");
});

module.exports = router;