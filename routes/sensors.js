var express = require('express');
var dateFormat = require('dateformat');
var sendMessage = require('../public/javascripts/message');
var utility = require('../public/javascripts/helper');
var router = express.Router();

var jsonResponse = {
  tempValue: 0,
  proximityValue: 0,
  timeStamp: dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT"),
  tempState: 'SAFE',
  proximityState: 'SAFE'
}

/* GET home page. */
router.get('/:sensor', function(req, res, next) {
//  res.json(req.params);
  var param = req.params.sensor;
  console.log("Param type: " + param);
  //res.send(param);
  var returnTemp = function() {
    var temp = utility.getTemperature();
    jsonResponse.tempValue = temp;
    jsonResponse.timeStamp = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT");
    if(temp <= 15 || temp > 45)
      jsonResponse.tempState = 'CRITICAL';
    if((temp > 15 && temp < 20) || (temp > 35 && temp <= 45))
      jsonResponse.tempState = 'WARNING';

  };

  var returnProximity = function() {
    var proxValue = utility.getProximity();
    jsonResponse.proximityValue = proxValue;
    jsonResponse.timeStamp = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT");
    if(proxValue === 1)
      jsonResponse.proximityState = 'UNSAFE';

  };

  if(param === 'temperature'){
    returnTemp();
    console.log('Temperature JSON ', jsonResponse);
    res.send(jsonResponse);
  }
  else if(param === 'proximity'){
    returnProximity();
    console.log('Proximity JSON ', jsonResponse);
    res.send(jsonResponse);
  }
  else if(param === 'sound'){

  }
  else if(param === 'message'){
    console.log(req.body);
    var message = req.body.message;
    var phone = req.body.phone;
    console.log('Server received '+ message + ' ' +phone);
    //res.send(sendMessage(phone, message));
    var promise = sendMessage(phone, message);
    res.send(promise);
  }

});

router.post('/:sensor/:phone/:message', function(req, res, next) {
  var message = req.params.message;
  var phone = req.params.phone;
  console.log('Server received '+ message + ' ' +phone);
  //res.send(sendMessage(phone, message));
  var promise = sendMessage(phone, message);
  res.send(promise);
});


module.exports = router;
