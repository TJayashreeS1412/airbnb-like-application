var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/swayaway');
var collection = db.get('reservations');

router.get('/', function(req, res){
    collection.find({}, function(err, reservations){
        if (err) throw err;
        res.json(reservations);
    });
});

router.get('/reservation', function(req, res) {
	collection.find({ reservationId: Number(req.query.reservationId) }, function(err, reservation){
		if (err) throw err;
	  	res.json(reservation);
	});
});

router.put('/', function(req, res) {
	//req.body is used to read form input
	collection.update({reservationId : Number(req.query.reservationId )},
		{ $set: {
        startDate: req.body.startDate,
        endDate: req.body.endDate
		}
	}, function(err, reservation){
		if (err) throw err;
		// if update is successfull, it will return updated object
	  	res.json(reservation);
	});
});

router.post('/', function(req, res) {
	//req.body is used to read form input
	collection.insert({
    reservationId: req.body.reservationId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    propertyId: req.body.propertyId,
	userId: req.body.userId
	}, function(err, reservation){
		if (err) throw err;
		// if insert is successfull, it will return newly inserted object
	  	res.json(reservation);
	});
});

router.delete('/', function(req, res) {
	collection.remove({ reservationId: Number(req.query.reservationId) }, function(err, reservation){
		if (err) throw err;
	  	res.json(reservation);
	});
});

module.exports = router;