var Promise = require('bluebird');
var _       = require('lodash');

var UserController = function(app) {
  this.knex = app.get('knex');
};

UserController.prototype.getRandom = function() {
  var minimumGroupSize = 3;
  var maximumGroupSize = 5;
  var numberOfUsers;
  return this.knex('Users').select('first_name as firstName', 'last_name as lastName', 'team')
  .then((users) => {
    numberOfUsers = users.length;
    return _.shuffle(users); //shuffle the users
  })
  .then((users) => {
    return _.values(_.groupBy(users, 'team'));
  })
  .then((teamGroups) => {
    var userGroups = [];
    var numberOfBuckets = Math.ceil(numberOfUsers/maximumGroupSize);
    for (var i = 0; i < numberOfBuckets; i++) {
      userGroups.push([]);
    };
    var count = 0;
    for (var j = 0; j < teamGroups.length; j++) {
      var teamGroup = teamGroups[j];
      for (var k = 0; k < teamGroup.length; k++) {
        count++;
        user = teamGroup[k];
        userGroups[count % numberOfBuckets].push(user); 
      };
    };
    return userGroups;
  });
};

UserController.prototype.create = function(user){
  return this.knex('Users').insert(user);
};

module.exports = UserController;