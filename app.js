var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var person = require('./modals/person');
var path = require ('path');



/*
setting body parser to parse post request
*/
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


// setting view folder and engine
app.set('views' , __dirname+'/public');
app.engine('html', require('ejs').renderFile);
//app.set('view engine' , 'ejs');
//app.use(express.static(path.join(__dirname + '.../public')));



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

var router = express.Router();

router.use(function(req , res , next){
    console.log('enter into routing part of application');
    next();
});

router.get('/',function(req , res){
    res.render('index.html');
    //res.send('index');
});


router.post('/persons' , function(req , res){
        console.log('step 1');
        console.log('req body : '+req.body.name);
        var per = new person();
        console.log('step 2');
        per.name = req.body.name;
        per.save(function(err){
            if (err)
                res.send(err);

            res.json({ message: 'person created!' });
        });
    });
router.get('/persons' , function(req , res){
    person.find(function(err , persons){
        if(err)
            res.send(err);
        res.json(persons);
    });
});




app.use('/api', router);

var port = process.env.PORT || 3000;
app.listen(port);

