var Schema = require('./schema');
var dbConfig = require('./config');

var knex = require('knex')({
  client: 'pg',
  connection: dbConfig
});

var _ = require('lodash');

function dropTable(tableName) {
  return knex.schema.dropTable(tableName);
}

function createTable(tableName) {
  console.log("OOOOO", tableName)

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
  tables = _.map(tableNames, function (tableName) {
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
createTables();
module.exports.createTables = createTables;