var Schema   = require('./schema');
var dbConfig = require('./config');
var Promise  = require('bluebird');

var knex = require('knex')({
  client: 'pg',
  connection: dbConfig
});

var _ = require('lodash');

function dropTable(tableName) {
  return knex.schema.dropTable(tableName);
}

function createTable(tableName) {
  return knex.schema.createTable(tableName, function (table) {
    table.timestamps();
    var column;
    var columnKeys = _.keys(Schema[tableName]);
    _.each(columnKeys, function (key) {
      if (Schema[tableName][key].type === 'text' && Schema[tableName][key].hasOwnProperty('fieldtype')) {
        column = table[Schema[tableName][key].type](key, Schema[tableName][key].fieldtype);
      }
      else if (Schema[tableName][key].type === 'string' && Schema[tableName][key].hasOwnProperty('maxlength')) {
        column = table[Schema[tableName][key].type](key, Schema[tableName][key].maxlength);
      }
      else {
        try {
          column = table[Schema[tableName][key].type](key);
        } catch (e) {
          column = table.specificType(key, Schema[tableName][key].type);
        }

      }
      if (Schema[tableName][key].hasOwnProperty('nullable') && Schema[tableName][key].nullable === true) {
        column.nullable();
      }
      else {
        column.notNullable();
      }
      if (Schema[tableName][key].hasOwnProperty('primary') && Schema[tableName][key].primary === true) {
        column.primary();
      }
      if (Schema[tableName][key].hasOwnProperty('unique') && Schema[tableName][key].unique) {
        column.unique();
      }
      if (Schema[tableName][key].hasOwnProperty('uniqueCompositeKeys') && Schema[tableName][key].uniqueCompositeKeys) {
        for (var i = Schema[tableName][key].uniqueCompositeKeys.length - 1; i >= 0; i--) {
          table.unique(Schema[tableName][key].uniqueCompositeKeys[i]);
        }
            
         }
      if (Schema[tableName][key].hasOwnProperty('index') && Schema[tableName][key].index) {
        column.index();
      }
      if (Schema[tableName][key].hasOwnProperty('unsigned') && Schema[tableName][key].unsigned) {
        column.unsigned();
      }
      if (Schema[tableName][key].hasOwnProperty('references')) {
        column.references(Schema[tableName][key].references);
      }
      if (Schema[tableName][key].hasOwnProperty('defaultTo')) {
        column.defaultTo(Schema[tableName][key].defaultTo);
      }
    });
  })
  .catch(function(e) {
    console.log(e);
  });
}
function createTables (opts) {
  var tables = [];
  var tableNames = _.keys(Schema);
  return Promise.map(tableNames, function (tableName) {
    return dropTable(tableName)
    .then(function(res) {
      return createTable(tableName);
    })
    .catch(function(err) {
      console.log("Error", err);
      // ignore drop failures.
      return createTable(tableName);
    });
  });
}

function seedDatabase (){
  var users = [
    {last_name: 'Adams', first_name:'John' },
    {last_name: 'Adams', first_name:'John Quincy' },
    {last_name: 'Arthur', first_name:'Chester Alan' },
    {last_name: 'Buchanan', first_name:'James' },
    {last_name: 'Bush', first_name:'George' },
    {last_name: 'Bush', first_name: 'George W.' },
    {last_name: 'Carter', first_name:'Jimmy' },
    {last_name: 'Cleveland', first_name:'Grover' },
    {last_name: 'Clinton', first_name:'Bill' },
    {last_name: 'Coolidge', first_name:'Calvin' },
    {last_name: 'Eisenhower', first_name:'Dwight D.' },
    {last_name: 'Fillmore', first_name:'Millard' },
    {last_name: 'Ford', first_name:'Gerald R.' },
    {last_name: 'Garfield', first_name:'James A.' },
    {last_name: 'Grant', first_name:'Ulysses S.' },
    {last_name: 'Harding', first_name:'Warren G.' },
    {last_name: 'Harrison', first_name:'Benjamin' },
    {last_name: 'Harrison', first_name:'William Henry' },
    {last_name: 'Hayes', first_name:'Rutherford Birchard' },
    {last_name: 'Hoover', first_name:'Herbert' },
    {last_name: 'Jackson', first_name:'Andrew' },
    {last_name: 'Jefferson', first_name:'Thomas' },
    {last_name: 'Johnson', first_name:'Andrew' },
    {last_name: 'Johnson', first_name:'Lyndon B.' },
    {last_name: 'Kennedy', first_name:'John F.' },
    {last_name: 'Lincoln', first_name:'Abraham' },
    {last_name: 'Madison', first_name:'James' },
    {last_name: 'McKinley', first_name:'William' },
    {last_name: 'Monroe', first_name:'James' },
    {last_name: 'Nixon', first_name:'Richard M.' },
    {last_name: 'Obama', first_name:'Barack' },
    {last_name: 'Pierce', first_name:'Franklin' },
    {last_name: 'Polk', first_name:'James K.' },
    {last_name: 'Reagan', first_name:'Ronald' },
    {last_name: 'Roosevelt', first_name:'Franklin D.' },
    {last_name: 'Roosevelt', first_name:'Theodore' },
    {last_name: 'Taft', first_name:'William H.' },
    {last_name: 'Taylor', first_name:'Zachary' },
    {last_name: 'Truman', first_name:'Harry S.' },
    {last_name: 'Trump', first_name:'Donald J.' },
    {last_name: 'Tyler', first_name:'John' },
    {last_name: 'Van Buren', first_name:'Martin' },
    {last_name: 'Washington', first_name:'George' },
    {last_name: 'Wilson', first_name:'Woodrow' }
  ];
  return Promise.mapSeries(users, function(user) {
    return knex('Users').insert(user);
  });
}

if(!process.env.TESTING){
  createTables()
  .then(() => {
    return seedDatabase();
  })
  .then(function(){
    process.exit();
  });
}

module.exports.createTables = createTables;