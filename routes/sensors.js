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
};

router.get('/:sensor', function(req, res, next) {
//  res.json(req.params);
  var param = req.params.sensor;
  console.log("Param type: " + param);
  //res.send(param);
  var tempValues = function(temp) {
  //  var temp = utility.getTemperature();
    jsonResponse.tempValue = temp.toFixed(2);
    jsonResponse.timeStamp = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT");
    if(temp <= 15 || temp > 45)
      jsonResponse.tempState = 'CRITICAL';
    if((temp > 15 && temp < 20) || (temp > 35 && temp <= 45))
      jsonResponse.tempState = 'WARNING';

  };

  var proxValues = function(proxValue) {
//    var proxValue = utility.getProximity();
    jsonResponse.proximityValue = proxValue.toFixed(2);
    jsonResponse.timeStamp = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT");
    if(proxValue === 1)
      jsonResponse.proximityState = 'UNSAFE';

  };

  var aggValues = function(){
    var aggProx = utility.getAggregatedProximity();
    var aggTemp = utility.getAggregatedTemperature();
    tempValues(aggTemp);
    proxValues(aggProx);
    utility.resetValues();

  };

  if(param === 'temperature'){

    var temp = utility.getTemperature();
    tempValues();
    console.log('Temperature JSON ', jsonResponse);
    res.send(jsonResponse);
  }
  else if(param === 'proximity'){

    var prox = utility.getProximity();
    proxValues(prox);
    console.log('Proximity JSON ', jsonResponse);
    res.send(jsonResponse);
  }
  else if(param === 'sound'){

  }
  else if(param === 'update'){
    aggValues();
    console.log('Approx JSON ', jsonResponse);
    res.send(jsonResponse);
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
