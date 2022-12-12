var express = require("express");
var router = express.Router();

var monk = require("monk");
var db = monk("localhost:27017/swayaway");
var collection = db.get("reservations");
var propCollection = db.get("properties");
var userCollection = db.get("users");

router.get("/", function (req, res) {
  collection.find({}, function (err, reservations) {
    if (err) throw err;
    res.json(reservations);
  });
});

router.get("/reservation", function (req, res) {
  console.log(req.query.userId);
  collection.find({ userId: req.query.userId }, function (err, reservations) {
    if (err) throw err;
    res.json(reservations);
  });
});

router.get("/getDatesList", function (req, res) {
  console.log(req.query.propId);
  collection.find({ propId: req.query.propId }, function (err, reservations) {
    if (err) throw err;
    res.json(reservations);
  });
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
      reservationId: Math.floor(Math.random() * 1000) + 1,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      propId: req.body.propId,
      userId: req.body.userId,
      title: req.body.title,
      images: req.body.images,
      address: req.body.address,
      hostName: req.body.hostName,
    },
    function (err, reservation) {
      if (err) throw err;
      // if insert is successfull, it will return newly inserted object
      res.json(reservation);
    }
  );
});

router.delete("/", function (req, res) {
  //cancel reservation - user page
  collection.remove(
    { reservationId: Number(req.query.reservationId) },
    function (err, reservation) {
      if (err) throw err;
      res.json(reservation);
    }
  );
});

module.exports = router;
