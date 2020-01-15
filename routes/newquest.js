const express = require('express');
const Sequelize = require('sequelize');
const VARS = require('../VARS')();
const router = express.Router();
const modelAnswer = require('../models/answer');
const modelQuestion = require('../models/question');
const modelQuestionLibrary = require('../models/questionlibrary');


const orm = new Sequelize(VARS.db, VARS.username, VARS.password, {
    host: VARS.host,
    dialect: VARS.dialect
})

orm.authenticate().then(() => {
    console.log("Successfully connected to DB");
}).catch(err => {
    console.log("Error connecting to DB: " + err);
})

const Answer = modelAnswer(orm);
const Question = modelQuestion(orm);
const QuestionLibrary = modelQuestionLibrary(orm);

Answer.__factory = {autoIncrementField: 'ans_id'}; // to add an auto increment field
Answer.ans_id = '' // test after removing this to see if this is really necessary

//returns answer id if new answer is created.
const newAnswer = (inputanswer, correct_flag) => {
        return Answer.create({answer: inputanswer, correct: correct_flag}); // return a promise
}

const newAnswerTransaction = (answers, correct_answer) => {
    return orm.transaction((transact) => {
        flag = 0;
        let ans_list = [];
        answers.forEach((ans) => {
            if(ans == correct_answer){
                flag = 1;
            } else {
                flag = 0;
            }
            ans_list.push(newAnswer(ans, flag));
        })
        return ans_list
    });
}

const pushQuestionLibrary = (quest_id, ans_id) => {
    QuestionLibrary.create({quest_id: quest_id, ans_id: ans_id});
}

//returns question id if the new question is created
const newQuest = (inputquestion, answers, correct_answer) => {
    Question.create({question: inputquestion, type: 0}).then((quest_id) => {
        newAnswerTransaction(answers, correct_answer).then(
            (result) => {
                result.forEach(res => {
                    res.then(row => {
                        pushQuestionLibrary(quest_id.get('quest_id'), row.get('ans_id')); //Push to QuestionLibrary Table
                    });
                })
            }
        )
    }).catch((err) => {
        console.log("Error: " + err)
        return false;
    })
}


router.post("/newquest", (req, res) => {
    console.log(newQuest(req.body.question, req.body.answers, req.body.correct));
    res.status(200).send("Question Added!");
});

module.exports = router;