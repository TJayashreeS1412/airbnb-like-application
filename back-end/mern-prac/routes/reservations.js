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
	collection.find({ reservation_id: Number(req.query.id) }, function(err, reservation){
		if (err) throw err;
	  	res.json(reservation);
	});
});

router.put('/', function(req, res) {
	//req.body is used to read form input
	collection.update({reservation_id : Number(req.query.id )},
		{ $set: {
        start_date: req.body.start_date,
        end_date: req.body.end_date
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
    reservation_id: req.body.reservation_id,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    property_id: req.body.property_id
	}, function(err, reservation){
		if (err) throw err;
		// if insert is successfull, it will return newly inserted object
	  	res.json(reservation);
	});
});

router.delete('/', function(req, res) {
	collection.remove({ reservation_id: Number(req.query.id) }, function(err, reservation){
		if (err) throw err;
	  	res.json(reservation);
	});
});

module.exports = router;