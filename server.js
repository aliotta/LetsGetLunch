'use strict';
// =====================================
// get the packages we need ============
// =====================================
var express         = require('express');
var http            = require('http');
var app             = express();
var bodyParser      = require('body-parser');

// =======================
// configuration =========
// =======================

var clientPath = 'dist';

var port = process.env.PORT || 5000; 

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/' + clientPath));

// =======================
// start the server ======
// =======================

var server = http.createServer(app);

require('./routes/user')(app,express);

app.instance = server.listen(port, function(){
    console.info('Express server listening on port ' + port);
});

process.on('message', function(message) {
    if(message.type === 'shutdown') {
        process.exit(0);
    }
});

