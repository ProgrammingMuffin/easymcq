const express = require('express');
const router = express.Router();
const model = require('../model');
const sha256 = require('sha256');

const User = model.User;

const getUser = (email, password) => {
    return User.count({where: {email: email, password: password}});
}


router.post("/login", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var hashed_pass = sha256(password);
    getUser(email, hashed_pass).then((count) => {
        if(count == 1){
            res.status(200).send("Logged in successfully!");
        } else {
            res.status(200).send("Invalid Credentials");
        }
    })
})

module.exports = router;