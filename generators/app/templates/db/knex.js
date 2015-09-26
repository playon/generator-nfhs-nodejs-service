var env = process.env.NODE_ENV || 'development';
var settings = require('./knexfile')[env];

module.exports = require('knex')(settings);
