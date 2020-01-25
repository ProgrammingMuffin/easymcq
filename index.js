let port = process.env.PORT || 3001;

const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const newquest = require('./routes/newquest2');
const getquest = require('./routes/getquest');
const createuser = require('./routes/createuser');
const test = require('./routes/test2');
const loginuser = require('./routes/loginuser');
const serviceanswerid = require('./routes/serviceanswerid');
const servicequestion = require('./routes/servicequestion');
const serviceanswer = require('./routes/serviceanswer');
const dashboard = require('./routes/dashboard');
const apply = require('./routes/apply');
const applyaction = require('./routes/applyaction');
const multer = require('multer');
const ejs = require('ejs');
const dotenv = require('dotenv'); //To read the .env file.
const cookieparser = require('cookie-parser');


dotenv.config(); //parse the .env file

app.use(cookieparser());
app.use("/", express.static(__dirname + "/public")); //serve static files present in the public directory.
app.use("/img", express.static(__dirname + '/uploads/images'));
app.use(cors()); //cross origin support
app.use(bodyParser.json()); //this is required to parse HTTP POST Body
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", express.static('public')); //serve static files present in the public directory.
app.use(multer({dest: './uploads/images'}).any());


app.set("view engine", "ejs");


app.use("/admin", newquest); //decommissioned
// app.use("/admin", getquest); //decommissioned
app.use("/user", createuser);
app.use("/test", test);
app.use("/user", loginuser);
app.use("/user", dashboard);
app.use("/apply", apply);
app.use("/applyaction", applyaction);
// app.use("/service/", serviceanswerid); //decommissioned
// app.use("/service/", servicequestion); //decommissioned
// app.use("/service/", serviceanswer); //decommissioned


app.listen(port, () => { console.log("congratulations, your server is running on port " + port + " " + __dirname) });