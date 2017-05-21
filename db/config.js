var dbConfig;

if(process.env.PRODUCTION === 'TRUE') {
  var url = require('url');
  var util = require('util');
  var env_url = process.env.DATABASE_URL;
  var db_url = url.parse(env_url);
  var auth = db_url.auth.split(':');
  dbConfig = {
    database: db_url.pathname.split('/')[1],
    user: auth[0],
    password: auth[1],
    host: db_url.hostname,
    port: db_url.port,
    ssl: true
  };
}
else {
  dbConfig = {
    database: 'postgres',
    schema: 'appt',
    user: 'postgres',
    password: 'cheese',
    host: 'localhost',
    port: 5432
  };
}

module.exports = dbConfig;