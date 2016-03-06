var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var person = require('./modals/person');



/*
setting body parser to parse post request
*/
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


// setting view folder and engine
app.set('views' , __dirname+'/public');
app.set('view engine' , 'ejs');

mongoose.connect('mongodb://localhost:27017/persons');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connect to mongoDB hell yeah');
});
/*app.get('/',function(req , res){
    res.send("hello world !!");
});
*/

var route = express.Router();
route.get('/',function(req , res){
    res.send("hello world !!");
});

app.use('', route);

var port = process.env.PORT || 3000;
app.listen(port);

