var env = process.env.NODE_ENV || 'development';
var settings = require('./knexfile')[env];
var knex = require('knex')(settings);

module.exports = require('bookshelf')(knex);
