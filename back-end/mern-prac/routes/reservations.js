var express = require("express");
var router = express.Router();

var monk = require("monk");
var db = monk("localhost:27017/swayaway");
var collection = db.get("reservations");
var propCollection = db.get("properties");
var userCollection = db.get("users");
var i = 0;

router.get("/", function (req, res) {
  collection.find({}, function (err, reservations) {
    if (err) throw err;
    res.json(reservations);
  });
});

router.get("/reservation", function (req, res) {
  collection.find(
    { reservationId: Number(req.query.reservationId) },
    function (err, reservation) {
      if (err) throw err;
      res.json(reservation);
    }
  );
});

router.put("/", function (req, res) {
  //req.body is used to read form input
  collection.update(
    { reservationId: Number(req.query.reservationId) },
    {
      $set: {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      },
    },
    function (err, reservation) {
      if (err) throw err;
      // if update is successfull, it will return updated object
      res.json(reservation);
    }
  );
});

router.post("/", function (req, res) {
  //req.body is used to read form input
  collection.insert(
    {
      reservationId: i + 1,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      propertyId: req.body.propertyId,
      userId: req.body.userId,
    },
    function (err, reservation) {
      if (err) throw err;
      // if insert is successfull, it will return newly inserted object
      propCollection.findOne(
        { propId: Number(req.body.propertyId) },
        async function (err, property) {
          if (err) throw err;
		  console.log(req.body.propertyId);
          await propCollection.update(
			
            { propId: Number(req.body.propertyId) },
            {
				
              $set: {
                reservations: property.reservations.concat(reservation), //direct object concat
              },
            },
            function (err, property) {
              if (err) throw err;
              // if update is successfull, it will return updated object
              res.json(property);
            }
          );
        }
      );
      if (req.body.userId) {
        userCollection.findOne(
          { userId: Number(req.body.userId) },
          async function (err, user) {
            await userCollection.update(
              { userId: Number(req.body.userId) },
              {
                $set: {
                  reservations: user.reservations.concat(reservation),
                },
              },
              function (err, user) {
                if (err) throw err;
                // if update is successfull, it will return updated object
                res.json(user);
              }
            );
            if (err) throw err;
            res.json(user);
          }
        );
      }
    }
  );
});

router.delete("/", function (req, res) { //cancel reservation - user page
  collection.remove(
    { reservationId: Number(req.query.reservationId) },
    function (err, reservation) {
      if (err) throw err;
      res.json(reservation);
      propCollection.findOne(
        { propId: Number(reservation.propertyId) },
        async function (err, property) {
          if (err) throw err;
          await propCollection.update(
            { propId: Number(reservation.propertyId) },
            {
              $set: {
                reservations: property.reservations.filter(function(item) {
					return item.reservationId !== reservation.reservationId
				}), //direct object concat
              },
            },
            function (err, property) {
              if (err) throw err;
              // if update is successfull, it will return updated object
              res.json(property);
            }
          );
        }
      );
      if (reservation.userId) {
        userCollection.findOne(
          { userId: Number(reservation.userId) },
          async function (err, user) {
            await userCollection.update(
              { userId: Number(reservation.userId) },
              {
                $set: {
                  reservations: user.reservations.filter(function(item) {
					return item.reservationId !== reservation.reservationId
				}),
                },
              },
              function (err, user) {
                if (err) throw err;
                // if update is successfull, it will return updated object
                res.json(user);
              }
            );
            if (err) throw err;
            res.json(user);
          }
        );
      }
    }
  );
});

module.exports = router;
