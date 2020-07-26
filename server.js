let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let app = express();
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});