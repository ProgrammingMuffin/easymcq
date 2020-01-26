const express = require('express');
const router = express.Router();
const model = require('../model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const session = require('../session');


dotenv.config();


const Test = model.Test;

const createTest = (res, testname, proctor, duration, sched_start, sched_end) => {
    Test.create({test_name: testname, proctor: proctor, duration: duration, sched_start: sched_start, sched_end: sched_end}).then((test) => {
        res.send(test.get('test_id').toString());
    });
}


router.post("/create", (req, res) => {
    if(!session.isLogged(req, "user")) {
        res.redirect("../../login/admin");
    }
    var testname = req.body.testname;
    var proctor = req.body.proctor;
    var duration = parseInt(req.body.duration);
    var sched_start = parseInt(req.body.sched_start);
    var sched_end = parseInt(req.body.sched_end);
    createTest(res, testname, proctor, duration, sched_start, sched_end);
})

module.exports = router;