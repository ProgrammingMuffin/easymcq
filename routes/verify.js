const express = require('express');
const router = express.Router();
const session = require('../session');
const model = require('../model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();


const Test = model.Test;
const TestInvite = model.TestInvite;
const UserQuestions = model.UserQuestions;


const verifyProctor = (res, test_id, user_id, proctor) => {
    TestInvite.count({where: {test_id: test_id, user_id: user_id}})
    .then((count) => { //counts instances
        Test.count({where: {test_id: test_id, proctor: proctor}})
        .then((same) => {
            if(same == 1) {
                // proctor code verified! Generate UserQuestions if not exists
                UserQuestions.count({where: {user_id: user_id, test_id: test_id}})
                .then((quests) => {
                    if(quests == 0) {
                        // redirect to host/userquests/generate/:testid
                        res.redirect("../userquests/generate/" + test_id);
                    } else {
                        res.redirect("../test/" + test_id + "/1");
                    }
                })
            }
        })
    });
}


router.post("/:testid", (req, res) => {
    if(!session.isLogged(req, "user")) {
        res.redirect("../../login/user");
    }
    var testid = parseInt(req.params.testid);
    var proctor = req.body.proctor;
    var jwttoken = req.cookies.jwttoken;
    var user_id = parseInt(jwt.verify(jwttoken, process.env.JWT_SECRET).user_id);
    verifyProctor(res, testid, user_id, proctor);
});

module.exports = router;