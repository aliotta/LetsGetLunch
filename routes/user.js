var util                = require('util');
var bodyParser          = require('body-parser');
var UserController      = require('../controllers/user');

module.exports = function (app, express) {
    'use strict';
    var api             = express.Router();
    var userController  = new UserController(app);

    api.get('/random', function(req, res) {
        userController.getRandom()
        .then((userGroups) => {
            res.status(200).json(userGroups);
        })
        .catch((err)=>{
            res.status(500).json(err);  
        });
    });

    app.use(bodyParser.json());

    app.use('/user', api);
};
