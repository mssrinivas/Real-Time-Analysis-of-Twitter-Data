var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

var con = mysql.createConnection({
    host: "tweets.ck2hvfzr43j1.us-west-2.rds.amazonaws.com",
    user: "cmpe266user",
    password: "cmpe266user",
    database : "tweets"
});

// catch 404 and forward to error handler
var data = {
    "cp" : 20,
    "cn" : 10,
    "bp" : 20,
    "bn" : 10
}
var sql1 = "select count(party) as p,party from tweets where polarity>0 group by party;";
var sql2 = "select count(party) as p,party from tweets where polarity<0 group by party;";

//Route to get All Books when user visits the Home Page
app.get('/', function(req,res) {
    console.log("Inside Get details");

        //Get the positive polarity
        con.query(sql1, function (err, result) {
            if (err) {
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                })
                console.log(err);
                res.end("Unable to fetch data");
            } else {
                console.log("Data : ", result);
                data.cp = result[1].p;
                data.bp = result[0].p;
                console.log("CP : ", data.cp);
                //get the negative polarity
                con.query(sql2, function (err, result) {
                    if (err) {
                        res.writeHead(400, {
                            'Content-Type': 'text/plain'
                        })
                        console.log(err);
                        res.end("Unable to fetch data");
                    } else {
                        console.log("Data : ", result);
                        data.cn = result[1].p;
                        data.bn = result[0].p;
                        console.log("CN : ", data.cn);
                        //return the data found
                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        })
                        res.end(JSON.stringify(data));
                    }
                });
            }
        })
});

app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
