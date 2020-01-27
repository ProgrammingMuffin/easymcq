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
const dashboard = require('./routes/dashboard');
const apply = require('./routes/apply');
const applyaction = require('./routes/applyaction');
const createtest = require('./routes/createtest');
const selectquest = require('./routes/selectquest');
const createpool = require('./routes/createpool');
const adminloginview = require('./routes/adminloginview');
const userloginview = require('./routes/userloginview');
const logout = require('./routes/logout');
const multer = require('multer'); // for file upload handling
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
app.use("/css", express.static('public/css')); //serve static files present in the public directory.
app.use(multer({dest: './uploads/images'}).any());


app.set("view engine", "ejs");

//  /login/admin
app.use("/login", adminloginview);
//  /login/user
app.use("/login", userloginview);
//  /logout/
app.use("/logout", logout);
//  /admin/newquest
app.use("/admin", newquest);
//  /admin/test/:testid/selectquest
app.use("/admin", selectquest);
// /admin/createpool/test/:testid
app.use("/admin", createpool);
// /user/create
app.use("/user", createuser);
// /test/:testid/:quest
app.use("/test", test);
// /test/create
app.use("/test", createtest);
// /user/login
app.use("/user", loginuser);
// /user/dashboard
app.use("/user", dashboard);
// /apply//
app.use("/apply", apply);
// /applyaction/test/:testid
app.use("/applyaction", applyaction);


app.listen(port, () => { console.log("congratulations, your server is running on port " + port + " " + __dirname) });
