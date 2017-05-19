var Promise = require('bluebird');

var UserController = function(app) {
};

UserController.prototype.getRandom = function() {
    return Promise.resolve([[{firstName: 'Alex', lastName: 'L'}, {firstName: 'Rob', lastName: 'W'}], [{firstName: 'Peter', lastName: 'Parker'},{firstName: 'Marquis', lastName: 'L'}],[{firstName: 'Mary', lastName: 'K'},{firstName: 'Beth', lastName: 'B'}, {firstName: 'Sam', lastName: 'Smith'}]]);
};

module.exports = UserController;