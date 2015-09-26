var fs = require('fs');
var sys = require('sys');
var exec = require('child_process').exec;

function puts(error, stdout, stderr) {
  if (stdout) sys.log(stdout);
  if (error) sys.log(error);
  if (stderr) sys.log(stderr);
}

var env = process.env.NODE_ENV || 'development';
console.log('');
console.log(env+': running seeds');
console.log('');

var seedsPath = __dirname + "/../seeds";
fs.readdir(seedsPath, function(err, seeds) {
  for (var i = 0; i < seeds.length; i += 1) {
    var command = "cd " + __dirname + "/../seeds && node ./" + seeds[i];
    exec(command, puts);
  }
});