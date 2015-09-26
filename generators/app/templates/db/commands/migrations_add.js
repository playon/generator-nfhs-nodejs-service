var name = process.argv.length > 1 && process.argv[2];
if (!name) { console.log('You must provide a name for the migration\n'); return false; }

var addMigrationCommand = "cd " + __dirname + "/../ && knex migrate:make " + name;

var sys = require('sys');
var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
  if (stdout) sys.log(stdout);
  if (error) sys.log(error);
  if (stderr) sys.log(stderr);
}

var env = process.env.NODE_ENV || 'development';
console.log('');
console.log(env+': creating migration (' + name + ')');
console.log('');

exec(addMigrationCommand, puts);