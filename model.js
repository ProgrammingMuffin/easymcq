const Sequelize = require('sequelize');

const modelAnswer = require('./models/answer');
const modelAnswerImage = require('./models/answerimage');
const modelQuestion = require('./models/question');
const modelQuestionImage = require('./models/questionimage');
const modelQuestionLibrary = require('./models/questionlibrary');
const modelTest = require('./models/test');
const modelUser = require('./models/user');
const modelUserQuestions = require('./models/userquestions');
const dotenv = require('dotenv');


dotenv.config();

const orm = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
});

const mAnswer = modelAnswer(orm);
const mUserQuestions = modelUserQuestions(orm);
const mQuestionLibrary = modelQuestionLibrary(orm);
const mQuestion = modelQuestion(orm);

mQuestionLibrary.belongsTo(mAnswer, {as: 'Answer', foreignKey: 'ans_id'});
mAnswer.belongsTo(mQuestionLibrary, {as: 'QuestionLibrary', foreignKey: 'ans_id'});
mQuestionLibrary.belongsTo(mQuestion, {as: 'Question', foreignKey: 'quest_id'});


module.exports.Answer = mAnswer;
module.exports.AnswerImage = modelAnswerImage(orm);
module.exports.Question = mQuestion;
module.exports.QuestionImage = modelQuestionImage(orm);
module.exports.QuestionLibrary = mQuestionLibrary
module.exports.Test = modelTest(orm);
module.exports.User = modelUser(orm);
module.exports.UserQuestions = mUserQuestions;