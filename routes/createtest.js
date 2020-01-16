const express = require('express');
const router = express.Router();


router.post("/createtest", (req, res) => {
    var testname = req.body.testname;
    var proctor = req.body.proctor;
    
    //redirect to another page here
})