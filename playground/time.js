const moment = require('moment');

// const date = moment();
// date.add(100, 'year').subtract(9, 'months');
// console.log(date.format('MMM Do YYYY'));

const createdAt = 1234;
const date = moment(createdAt);
console.log(date.format('h:mm a'));

const someTimestamp = moment().valueOf();
console.log(someTimestamp);
