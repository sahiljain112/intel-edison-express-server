/* This is the file which reads in all the sensor data.

1) It has methods which can return sensor reading at any time.
2) Every 5 mins, the average reading of the sensor is sent and UI is updated.

*/

var express = require('express');
var credentials = require('./token.js');
var mraa = require('mraa'); //require mraa

console.log('MRAA Version: ' + mraa.getVersion());

var tempPin = new mraa.Aio(0); //setup access analog input Analog pin #0 for temperature sensing!
var buzzerPin = new mraa.Gpio(12);
var proximity = new mraa.Gpio(0);
var stepCount = 0, avgTemp = 0, avgProximity = 0;     // Measured as 0,1!

var utility = {

  getTemperature: function(){
    // var analogValue = tempPin.read() * 0.004882814;
    // return ((analogValue - 0.5) * 100);

    return 1;
  },

  getProximity: function() {
    // var proximityValue = proximity.read();
    // if(proximityValue === 1)
    //    buzzerPin.write(1);
    // return proximityValue;

    return 0;
  },

  getAggregatedProximity: function() {
    return avgProximity/stepCount;
  },

  getAggregatedTemperature: function() {
    return avgTemp/stepCount;
  },

  setAggregatedTemperature: function () {
    avgTemp = avgTemp + getTemperature();
  },

  setAverageProximity: function() {
    avgProximity = aveProximity + getProximity();
    stepCount = stepCount + 1;
  },

  resetValues: function() {
    avgProximity = avgTemp = stepCount = 0;
  }

}

module.exports = utility;
