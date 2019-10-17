// app.js

var express = require('express');
var bodyParser = require('body-parser');

var product = require('./routes/product'); // Imports routes for the products
var app = express();


// Set up mongoose connection
var mongoose = require('mongoose');
let mongoUser = process.env.MONGODB_USER;
let mongoPass = process.env.MONGODB_PASSWORD;
let databaseServiceName = process.env.DATABASE_SERVICE_NAME;
let mongoDatabase = process.env.MONGODB_DATABASE;
var dev_db_url = `mongodb://${mongoUser}:${mongoPass}@${databaseServiceName}:23619/${mongoDatabase}`;
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);

var port = 8080;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
