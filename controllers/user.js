var Promise = require('bluebird');
var _       = require('lodash');

var UserController = function(app) {
  this.knex = app.get('knex');
};

UserController.prototype.getRandom = function() {
  var minimumGroupSize = 3;
  var maximumGroupSize = 5;
  var numberOfUsers;
  return this.knex('Users').select('first_name as firstName', 'last_name as lastName', 'team', 'available')
  .then((users) => {
    return this.scrubData(users);
  })
  .then((results) => {
    var firstNameUserGroups = results[0];
    numberOfUsers = results[1];

    var newUsers = [];
    for (var i = 0; i < firstNameUserGroups.length; i++) {
      var length = firstNameUserGroups[i].length;
      if(length > 1){
         for (var k = 0; k < firstNameUserGroups[i].length; k++) {
           newUsers.push(firstNameUserGroups[i][k]);
         };
      }
      else {
        delete firstNameUserGroups[i][0].lastName;
        newUsers.push(firstNameUserGroups[i][0]);
      }
    };
    return _.values(_.groupBy(newUsers, 'team'));
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

/**
Filters and shuffles users
**/
UserController.prototype.scrubData = function(all_users){
  var numberOfUsers;
  return Promise.resolve(all_users)
  .then((users) => {
    return _.shuffle(users); //shuffle the users
  })
  .then((users) => {
    return _.filter(users, (user) => {
      return user.available;
    });
  })
  .then((users) => {
    numberOfUsers = users.length;
    return _.values(_.groupBy(users, 'firstName'));
  })
  .then((users) => {
    return [users, numberOfUsers];
  });
}

UserController.prototype.create = function(user){
  return this.knex('Users').insert(user);
};

module.exports = UserController;