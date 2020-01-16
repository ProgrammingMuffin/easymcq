const Sequelize = require('sequelize');
const express = require('express');
const VARS = require('../VARS')();
const modelQuestion = require('../models/question');
const modelQuestionImage = require('../models/QuestionImage');
const router = express.Router();


const orm = new Sequelize(VARS.db, VARS.username, VARS.password, {
    host: VARS.host,
    dialect: VARS.dialect
});

const Question = modelQuestion(orm);
const QuestionImage = modelQuestionImage(orm);


const getQuestions = (offset, limit) => {
    
}

const getRowBrief = (offset, limit) => {
    quest_prom = getQuestions(offset, limit);
    console.log(quest_prom);
}


//The URL will be like admin/getquest/page/limit_per_page
router.get("/getquest/:page/:limit", (req, res) => {
    var page = parseInt(req.params.page);
    var limit = parseInt(req.params.limit);
    var offset = (page-1)*limit;
    // getRowBrief(offset, limit).then(result => {
    //     console.log(result);
    //     res.status(200).send("Done.");
    // });
    getRowBrief(offset, limit);
});

module.exports = router;