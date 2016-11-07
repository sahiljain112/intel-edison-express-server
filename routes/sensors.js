var express = require('express');
var sendMessage = require('../public/javascripts/message');
var utility = require('../public/javascripts/helper');
var router = express.Router();

var jsonResponse = {
  tempValue: 0,
  proximityValue: 0,
  timeStamp: new Date().getTime(),
  tempState: 'SAFE',
  proximityState: 'SAFE'
}

/* GET home page. */
router.all('/:sensor', function(req, res, next) {
//  res.json(req.params);
  var param = req.params.sensor;
  console.log("Param type: " + param);
  //res.send(param);
  var returnTemp = function() {
    var temp = utility.getTemperature();
    jsonResponse.value = temp;
    jsonResponse.timeStamp = new Date().getTime();
    if(temp <= 15 || temp > 45)
      jsonResponse.state = 'CRITICAL';
    if((temp > 15 && temp < 20) || (temp > 35 && temp <= 45))
      jsonResponse.state = 'WARNING';

  };

  var returnProximity = function() {
    var temp = utility.getProximity();
    jsonResponse.value = temp;
    jsonResponse.timeStamp = new Date().getTime();
    if(temp <= 15 || temp > 45)
      jsonResponse.state = 'CRITICAL';
    if((temp > 15 && temp < 20) || (temp > 35 && temp <= 45))
      jsonResponse.state = 'WARNING';

  };

  if(param === 'temperature'){
    returnTemp();
    res.json(jsonResponse);
  }
  else if(param === 'proximity'){

  }
  else if(param === 'update'){

  }
  else if(param === 'message'){
    var message = req.body.message;
    var phone = req.body.phone;
    res.send(sendMessage(phone, message));
  }

});


module.exports = router;
