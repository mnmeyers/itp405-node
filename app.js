var express = require('express');
var ejs = require('ejs');
var Dvd = require('./models/Dvd');
var app = express();
app.set('view engine', 'ejs');
//routes:
app.get('/', function(req, res){
   console.log('index view rendered');
    res.render('index', {
        title: 'Home'
    });
});

app.get('/dvds', function(req, res){
   console.log(req.query.title);
    Dvd.findAll({
        where: {
            title: {
                like: '%' + req.query.title + '%'
            },
            award: {
                like: req.query.award
            }
        },
        order: 'title ASC'
    }).then(function(results){
        res.render('dvds', {
           dvds: results
        });
    });
});
app.listen(3000, function(){
    console.log('listening on localhost:3000');
});