const express = require('express');
const Sequelize = require('sequelize');
const VARS = require('../VARS')();
const router = express.Router();
const model = require('../model');
const http = require('http');
const request = require('sync-request');


const UserQuestions = model.UserQuestions;
const Question = model.Question;
const QuestionLibrary = model.QuestionLibrary;
const Answer = model.Answer;



//get the quest_id
const getQuestionID = (quest_num) => {
    return UserQuestions.findOne({where: {test_id: 4}, offset: (quest_num-1), limit: 1});
}

const getQuestionText = (quest_id) => {
    return QuestionLibrary.findOne({where: {quest_id: quest_id}, include: [{model: Question, as: 'Question'}]});
}

//get the answers
const getAnswers = (quest_id) => {
    return QuestionLibrary.findAll({where: {quest_id: quest_id}, include: [{model: Answer, as: 'Answer'}, {model: Question, as: 'Question'}]});
}


router.get("/:testid/:quest", (req, res) => {
    var test_id = parseInt(req.params.testid);
    var quest_num = parseInt(req.params.quest) - 1;
    var quest_id = 161;

    getQuestionID(2).then(quest => {
        getQuestionText(quest.get('quest_id')).then(question => {
            console.log(question.get('Question'));
            console.log("\n\n\n");
            getAnswers(quest.get('quest_id')).then((answer) => {
                answer.forEach(ans => {
                    console.log(ans.get('Answer'));
                })
            })
        })
    })
});

module.exports = router;