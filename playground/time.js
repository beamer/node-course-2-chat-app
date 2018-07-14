const moment = require('moment');

// var mydate = new Date();
// console.log(mydate.getMonth());

var createdAt = 123;
var mydate = moment();
var curtime = moment().valueOf();
console.log(curtime);
console.log(mydate.format('ddd DD-MMM-YY HH:MM:SS h:mmA'));
