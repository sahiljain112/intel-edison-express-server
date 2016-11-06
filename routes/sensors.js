var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:sensor', function(req, res, next) {
//  res.json(req.params);
  var sensorName = req.params.sensor;
  console.log("Sensor type: " sensorName);
  res.send(sensorName);
});

module.exports = router;
