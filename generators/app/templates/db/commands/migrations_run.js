var runMigrationCommand = "cd " + __dirname + "/../ && knex migrate:latest";

var sys = require('sys');
var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
  if (stdout) sys.log(stdout);
  if (error) sys.log(error);
  if (stderr) sys.log(stderr);
}

var env = process.env.NODE_ENV || 'development';
console.log('');
console.log(env+': running migrations');
console.log('');

exec(runMigrationCommand, puts);
