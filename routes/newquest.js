const express = require('express');
const Sequelize = require('sequelize');
const VARS = require('../VARS')();
const router = express.Router();
const modelAnswer = require('../models/answer');
const modelQuestion = require('../models/question');
const modelQuestionLibrary = require('../models/questionlibrary');
const modelAnswerImage = require('../models/AnswerImage');
const modelQuestionImage = require('../models/QuestionImage');
const fs = require('fs'); //for the file moving stuff..
const path = require('path'); //file extension

// REUSABLE MODULES (LATER TO BE PUSHED TO A SEPERATE FILE)

const moveFileToDir = (file_path, new_file_path) => {
    fs.rename(file_path, new_file_path, ()=>{});
}


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
const AnswerImage = modelAnswerImage(orm);
const QuestionImage = modelQuestionImage(orm);

Answer.__factory = {autoIncrementField: 'ans_id'}; // to add an auto increment field
Answer.ans_id = '' // test after removing this to see if this is really necessary

//returns answer id if new answer is created.
const newAnswer = (inputanswer, correct_flag) => {
        return Answer.create({answer: inputanswer, correct: correct_flag}); // return a promise
}

const newAnswerTransaction = (answers, correct_answer, files) => {
    return orm.transaction((transact) => {
        flag = 0;
        let ans_list = [];
        console.log(files)
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

const addQuestionImage = (quest_id, img) => {
    new_name = "q" + quest_id + path.extname(img.originalname);
    moveFileToDir(img.path, "uploads/images/" + new_name)
    QuestionImage.create({quest_id: quest_id, imagename: new_name});
}

const addAnswerImage = (ans_id, img) => {
    new_name = "a" + ans_id + path.extname(img.originalname);
    moveFileToDir(img.path, "uploads/images/" + new_name);
    AnswerImage.create({ans_id: ans_id, imagename: new_name});
}

//returns question id if the new question is created
const newQuest = (inputquestion, answers, correct_answer, files) => {
    Question.create({question: inputquestion, type: 0}).then((quest_id) => {
        files.forEach(img => {
            if(img.fieldname == 'questimg'){
                addQuestionImage(quest_id.get('quest_id'), img)
            }
        })
        newAnswerTransaction(answers, correct_answer, files).then(
            (result) => {
                var i = 1; //initiating here cuz we need to iterate over every answer ID to insert an image there..
                result.forEach(res => {
                    res.then(row => {
                        pushQuestionLibrary(quest_id.get('quest_id'), row.get('ans_id')); //Push to QuestionLibrary Table
                        files.forEach(img => {
                            if(img.fieldname == ("" + i)){ //to convert it into a string
                                addAnswerImage(row.get('ans_id'), img);
                            }
                            console.log(i)
                        })
                        i++;
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
    newQuest(req.body.question, req.body.answers, req.body.correct, req.files);
    console.log(req.files);
    res.status(200).send("Question Added!");
});

module.exports = router;