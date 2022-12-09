var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/swayaway');
var collection = db.get('properties');

router.get('/', function(req, res){
    collection.find({}, function(err, properties){
        if (err) throw err;
        res.json(properties);
    });
});

router.get('/property', function(req, res) {
	collection.findOne({ prop_id: Number(req.query.id) }, function(err, property){
		if (err) throw err;
		res.send(property);
		// res.render('index',{tile: property});
	  	// res.json(property);
	});
});

router.put('/:id', function(req, res) {
	//req.body is used to read form input
	collection.update({prop_id: Number(req.query.id) },
		{ $set: {
		name: req.body.title,
        Ratings: req.body.props_ratings,
        BookedDates: req.body.available
		}
	}, function(err, property){
		if (err) throw err;
		// if update is successfull, it will return updated object
	  	res.json(property);
	});
});

router.post('/', function(req, res) {
	//req.body is used to read form input
	collection.insert({ 
    prop_id : req.body.prop_id,
    title: req.body.title,
    houseType: req.body.house_type,
    propType: req.body.prop_type,
    guests: req.body.max_guests,
    bedrooms: req.body.bedrooms,
    address: req.body.address,
    Ratings: req.body.props_rating,
    Amenities: req.body.amenities,            
    reservations: req.body.reservations,
    HouseRules: req.body.house_rules,
    photo: req.body.photo,
    price: req.body.price,
    BookedDates: req.body.available
	}, function(err, property){
		if (err) throw err;
		// if insert is successfull, it will return newly inserted object
	  	res.json(property);
	});
});

router.delete('/:id', function(req, res) {
	collection.remove({ prop_id: Number(req.query.id) }, function(err, property){
		if (err) throw err;
	  	res.json(property);
	});
});

module.exports = router;