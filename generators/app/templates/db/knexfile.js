var host = '127.0.0.1';
var user = 'root';
var pswd = '';
var db = '<%= dbname %>';
var tz = 'UTC';

var opsworksSettingsFile = __dirname + '/../opsworks.js';
if (require('fs').existsSync(opsworksSettingsFile)) {
  var opsworks = require(opsworksSettingsFile);
  host = opsworks.db.host;
  user = opsworks.db.username;
  pswd = opsworks.db.password;
  db = opsworks.db.database;
}

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host     : host,
      user     : user,
      password : pswd,
      database : db,
      timezone : tz
    },
    debug:false
  },

  stage: {
    client: 'mysql',
    connection: {
      host     : host,
      user     : user,
      password : pswd,
      database : db,
      timezone : tz
    },
    debug:false
  },

  production: {
    client: 'mysql',
    connection: {
      host     : host,
      user     : user,
      password : pswd,
      database : db,
      timezone : tz
    },
    debug:false
  }

};
