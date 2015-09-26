var env = process.env.NODE_ENV || 'development';
var settings = require('../knexfile')[env];

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : settings.connection.host,
    user     : settings.connection.user,
    password : settings.connection.password,
    charset  : 'utf8'
  }
});

console.log('');
console.log(env+': creating database (' + settings.connection.database + ')');
console.log('');

knex.raw('CREATE DATABASE IF NOT EXISTS ' + settings.connection.database)
.then(function() {
  knex.destroy();
});
