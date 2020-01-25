const express = require('express');
const router = express.Router();
const sha256 = require('sha256');
const model = require('../model');

const User = model.User;

const createUser = (password, name, email, phone, DOB, collegename, degree) => {
    User.create({password: password, name: name, email: email, phone: phone, DOB: DOB, college_name: collegename, degree: degree});
}

router.post("/create", (req, res) => {
    var name = req.body.name;
    var password = sha256(req.body.password);
    var email = req.body.email;
    var phone = req.body.phone;
    var DOB = req.body.dob;
    var collegename = req.body.collegename;
    var degree = req.body.degree;
    createUser(password, name, email, phone, DOB, collegename, degree);
    //res.redirect("/loginuser.html");
});

module.exports = router;