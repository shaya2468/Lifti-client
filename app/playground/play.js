




//moment stuff don't touch
//https://stackoverflow.com/questions/26392280/using-momentjs-to-convert-date-to-epoch-then-back-to-date
// var moment = require('moment');
// console.log('welcome');
// var timestamp = moment("10/15/2014 19:00", "MM/DD/YYYY HH:mm").unix();
// console.log(timestamp);
//
// var message = moment.unix(timestamp).format('MMM Do YYYY @ h:mm a');
// console.log(message);
//
// var hour = moment.unix(timestamp).format('H');
// console.log(hour);
//
// var hour2 = moment.unix(timestamp).format('h a');
// console.log(hour2);


var moment = require('moment');
console.log('welcome');
var timestamp = moment("2017-06-29 14:33", "YYYY/MM/DD HH:mm").unix();
console.log(timestamp);

var message = moment.unix(timestamp).format('MMM Do YYYY @ h:mm a');
console.log(message);

var hour = moment.unix(timestamp).format('H');
console.log(hour);

var hour2 = moment.unix(timestamp).format('h a');
console.log(hour2);
