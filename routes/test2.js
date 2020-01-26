const express = require('express');
const Sequelize = require('sequelize');
const VARS = require('../VARS')();
const router = express.Router();
const model = require('../model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const session = require('../session');

dotenv.config();

const UserQuestions = model.UserQuestions;
const Question = model.Question;
const QuestionLibrary = model.QuestionLibrary;
const Answer = model.Answer;



//get the quest_id
const getQuestionID = (quest_num, test_id, user_id) => {
    return UserQuestions.findOne({where: {test_id: 4, user_id: user_id}, offset: (quest_num-1), limit: 1});
}

const getQuestionText = (quest_id) => {
    return QuestionLibrary.findOne({where: {quest_id: quest_id}, include: [{model: Question, as: 'Question'}]});
}

//get the answers
const getAnswers = (quest_id) => {
    return QuestionLibrary.findAll({where: {quest_id: quest_id}, include: [{model: Answer, as: 'Answer'}, {model: Question, as: 'Question'}]});
}


router.get("/:testid/:quest", (req, res) => {
    if(!session.isLogged(req, "user")) {
        res.redirect("../../login/user");
    }
    var test_id = parseInt(req.params.testid);
    var quest_num = parseInt(req.params.quest);
    var jwt_token = jwt.verify(req.cookies.jwttoken, process.env.JWT_SECRET);
    var user_id = jwt_token.user_id;
    var answer_array = [];
    getQuestionID(quest_num, test_id, user_id).then(quest => {
        getQuestionText(quest.get('quest_id')).then(question => {
            console.log(question.get('Question'));
            console.log("\n\n\n");
            getAnswers(quest.get('quest_id')).then((answer) => {
                answer.forEach(ans => {
                    answer_array.push({answer: ans.get('Answer').get('answer')})
                })
                res.render("test", {
                    quest_num: quest_num,
                    question: question.get('Question').get('question'),
                    answers: answer_array
                })
            })
        })
    })
});

module.exports = router;