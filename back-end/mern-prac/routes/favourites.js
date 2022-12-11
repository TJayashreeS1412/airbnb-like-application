var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/swayaway');
var collection = db.get('users');

router.get('/', function(req, res){
    collection.find({}, function(err, users){
        if (err) throw err;
        res.json(users);
    });
});

router.get('/user', function(req, res) {
	collection.findOne({ userId: Number(req.query.userId) }, function(err, user){
		if (err) throw err;
	  	res.json(user);
	});
});

router.post('/', function(req, res){
    collection.insert({
        userId: req.body.userId,
        firstName : req.body.first_name,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password,
        isHost: req.body.isHost,
        languagesKnown: req.body.languagesKnown
    }, function(err, user){
        if (err) throw err;
        res.json(user);
    });
});

module.exports = router;