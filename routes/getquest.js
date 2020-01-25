const Sequelize = require('sequelize');
const express = require('express');
const model = require('../model');
const dotenv = require('dotenv');
const jwttoken = require('jsonwebtoken');
const router = express.Router();

dotenv.config();


const Question = model.Question;



//The URL will be like admin/getquest/page/limit_per_page