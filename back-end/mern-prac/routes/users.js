var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/swayaway');
var collection = db.get('users');
var propCollection = db.get("properties");


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
        userId: Math.floor(Math.random() * 1000) + 1,
        firstName : req.body.first_name,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password,
        isHost: req.body.isHost,
        languagesKnown: req.body.languagesKnown,
        favourites: [],
        reservations: [],
        properties:[]
    }, function(err, user){
        if (err) throw err;
        res.json(user);
    });
});

router.get('/favourites', function(req, res) {
    var allProperties, listOfFavProps = [];
    propCollection.find({}, function (err, properties) {
        if (err) throw err;
        allProperties =properties;
      });

	collection.findOne({ userId: Number(req.query.userId) }, function(err, user){
		if (err) throw err;
        if (user?.favorites && allProperties){
            for(i=0; i<allProperties.length; i++){
                for(j=0; j<user.favorites.length; j++){
                    if (allProperties[i].propId == user.favorites[j]){
                        listOfFavProps = listOfFavProps.concat(allProperties[i]);
                    }
                }
            }
        }
        res.json(listOfFavProps);
	});
});

router.get('/hostProperties', function(req, res) {
    console.log(req.query.userId);
    propCollection.find({hostId: Number(req.query.userId)}, function (err, properties) {
        if (err) throw err;
        res.json(properties);
      });
});

router.post('/addfavourites', async function(req, res){
    await collection.findOne(
        { userId: Number(req.body.userId) },
        async function (err, user) {
        if (err) throw err;

        await collection.update(
            { userId: Number(req.body.userId) },
            {
            $set: {
                favorites: user.favorites.concat(req.body.propId), // add property to list
            },
            },
            function (err, user) {
            if (err) throw err;
            // if update is successfull, it will return updated object
            res.json(user);
            }
        );
        }
    );
});

router.post('/removefavourites', async function(req, res){
    await collection.findOne(
        { userId: Number(req.body.userId) },
        async function (err, user) {
        if (err) throw err;

        await collection.update(
            { userId: Number(req.body.userId) },
            {
            $set: {
                favorites: user.favorites.filter(function(item) {
					return item.propId !== Number(req.body.propId)
				}),
            },
            },
            function (err, user) {
            if (err) throw err;
            // if update is successfull, it will return updated object
            res.json(user);
            }
        );
        }
    );
});

//become host
router.post("/enableHost", function (req, res) {
    //req.body is used to read form input
    collection.update(
      { userId: Number(req.body.userId) },
      {
        $set: {
          isHost: true
        },
      },
      function (err, property) {
        if (err) throw err;
        // if update is successfull, it will return updated object
        res.json(property);
      }
    );
  });

module.exports = router;