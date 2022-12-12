var express = require("express");
var router = express.Router();

var monk = require("monk");
var db = monk("localhost:27017/swayaway");
var collection = db.get("properties");
var userCollection = db.get("users");

router.get("/", function (req, res) {
  collection.find({}, function (err, properties) {
    if (err) throw err;
    res.json(properties);
  });
});

router.get("/property", function (req, res) {
  collection.findOne(
    { propId: Number(req.query.propId) },
    function (err, property) {
      if (err) throw err;
      res.send(property);
    }
  );
});

router.put("/:propId", function (req, res) {
  //req.body is used to read form input
  collection.update(
    { propId: Number(req.params.propId) },
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        houseType: req.body.houseType,
        maxGuests: req.body.maxGuests,
        bedrooms: req.body.bedrooms,
        beds: req.body.beds,
        baths: req.body.baths,
        address: req.body.address,
        amenities: req.body.amenities,
        houseRules: req.body.houseRules,
      },
    },
    function (err, property) {
      if (err) throw err;
      // if update is successfull, it will return updated object

      res.json(property);
    }
  );
});

router.post("/comments/:propId", async function (req, res) {
  //req.body is used to read form input
  var currProperty;
  await collection.findOne(
    { propId: Number(req.params.propId) },
    async function (err, property) {
      if (err) throw err;
      currProperty = property;

      await collection.update(
        { propId: Number(req.params.propId) },
        {
          $set: {
            userReview: property.userReview.concat(req.body),
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
});

router.post("/", function (req, res) {
  //req.body is used to read form input
  if (req.body.hostId) {
    collection.insert(
      {
        propId: Math.floor(Math.random() * 1000) + 1,
        hostId: req.body.hostId,
        title: req.body.title,
        description: req.body.description,
        images: req.body.images,
        price: req.body.price,
        avgRating: 0,
        userReview: [],
        houseType: req.body.houseType,
        maxGuests: req.body.maxGuests,
        bedrooms: req.body.bedrooms,
        beds: req.body.beds,
        baths: req.body.baths,
        address: req.body.address,
        amenities: req.body.amenities,
        houseRules: req.body.houseRules ? req.body.houseRules : [],
        reservations: [],
        isAvailable: true,
      },
      function (err, property) {
        if (err) throw err;
        // if insert is successfull, it will return newly inserted object
        res.json(property);
      }
    );
  }
});

router.delete("/:propId", function (req, res) {
  //softDelete
  collection.update(
    { propId: Number(req.params.propId) },
    {
      $set: {
        isAvailable: false,
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
