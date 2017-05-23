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
            console.error('Error in user/random ', err);
            res.status(500).json(err);  
        });
    });

    api.post('/create', function(req, res) {
        if(!req.body.firstName || !req.body.lastName || !req.body.team){
            res.status(400).json({error: 'Malformed request.'})
            return;
        }
        userController.create({first_name: req.body.firstName, last_name: req.body.lastName, team: req.body.team})
        .then((userGroups) => {
            res.status(200).json(userGroups);
        })
        .catch((err)=>{
            console.error('Error in user/random ', err);
            res.status(500).json(err);  
        });
    });

    app.use(bodyParser.json());

    app.use('/user', api);
};
