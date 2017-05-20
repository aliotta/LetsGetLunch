var Promise = require('bluebird');
var _       = require('lodash');

var UserController = function(app) {
  this.knex = app.get('knex');
};

UserController.prototype.getRandom = function() {
  var minimumGroupSize = 3;
  var maximumGroupSize = 5;
  return this.knex('Users').select('first_name as firstName', 'last_name as lastName')
  .then((users) => {
    numberOfUsers = users.length;
    return _.shuffle(users); //shuffle the users
  })
  .then((users) => {
    var userGroups = [];
    var numberOfBuckets = Math.ceil(users.length/maximumGroupSize);
    for (var i = 0; i < numberOfBuckets; i++) {
      userGroups.push([]);
    };

    for (var j = 0; j < users.length; j++) {
      userGroups[j % numberOfBuckets].push(users[j]);
    };
    return userGroups;
  });
};

UserController.prototype.create = function(user){
  return this.knex('Users').insert(user);
};

module.exports = UserController;