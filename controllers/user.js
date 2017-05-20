var Promise = require('bluebird');
var _       = require('lodash');

var UserController = function(app) {
  this.knex = app.get('knex');
};

UserController.prototype.getRandom = function() {
  //TODO the below balancing implementation works uniquely well for groups of 5 with a minimum group size of 3
  // if these requirements were to change the process will need to be changed
  var minimumGroupSize = 3;
  return this.knex('Users').select('first_name as firstName', 'last_name as lastName')
  .then((users) => {
    numberOfUsers = users.length;
    return _.chunk(_.shuffle(users),5); //shuffle the users and put them in groups of 5
  })
  .then((userGroups) => {
    var count = 0;
    var numberOfGroups = userGroups.length;
    if (userGroups[userGroups.length -1].length < minimumGroupSize){
      var mergedArray = _.concat(userGroups.pop(), userGroups.pop());
      var chunkedArrays = _.chunk(mergedArray, Math.floor(mergedArray.length/2));

      return _.concat(userGroups,chunkedArrays);
    }
    return userGroups;
  });
};

UserController.prototype.create = function(user){
  return this.knex('Users').insert(user);
};

module.exports = UserController;