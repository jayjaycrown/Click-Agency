const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const registerAuthRoute = require('./routes/auth/registerAuth');
const loginAuthRoute = require('./routes/auth/loginAuth')
const databaseConn = require('./config/dbconn')

//placing cors options for origin and other access details
var corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}  

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.urlencoded({extended: false}));
app.use('/auth', registerAuthRoute, loginAuthRoute);

//listening to predefined port
app.listen(port, () => {
	console.log('Application now listening to port ' + port);
})