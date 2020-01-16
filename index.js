let port = process.env.PORT || 3001;

const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const newquest = require('./routes/newquest');
const getquest = require('./routes/getquest');
const createuser = require('./routes/createuser');
const multer = require('multer');


app.use("/", express.static(__dirname + "/public")); //serve static files present in the public directory.
app.use("/img", express.static(__dirname + '/uploads/images'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", express.static('public')); //serve static files present in the public directory.
app.use(multer({dest: './uploads/images'}).any());


app.use("/admin", newquest);
app.use("/admin", getquest);
app.use("/user", createuser);


app.listen(port, () => { console.log("congratulations, your server is running on port " + port + " " + __dirname) });