// let express = require('express');
// let bodyParser = require('body-parser');
// let mongoose = require('mongoose');

// let app = express();
// var port = process.env.PORT || 8080;

// // Send message for default URL
// app.get('/', (req, res) => res.send('Hi, I am Chhotu'));
// // Launch app to listen to specified port
// app.listen(port, function () {
//     console.log("Running RestHub on port " + port);
// });


let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
var cors = require('cors')
const dbConfig = require("./config/database.js");
let app = express();
app.set('secretKey', 'nodeRestApi');
app.use(cors()) // Use this after the variable declaration

let apiRoutes = require("./api-routes");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect(dbConfig.database, { useNewUrlParser: true,useUnifiedTopology: true});
var db = mongoose.connection;
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

app.use(express.json({extended:false}));
app.get('/', (req, res) => res.send('Hi, I am Chhotu'));
// Use Api routes in the App
app.use('/api', apiRoutes);

// Setup server port
var port = process.env.PORT || 8080;
// var authUser = require('./UserAuth/validateUser')
// app.get('/api/testAuthUser',authUser.validateUser, (req, res) => res.send('Hello World with Express'));


// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running localhost: on port " + "localhost:"+port);
});