// nodejs server setup

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var path = require('path');
var compression = require('compression');
var cors = require('cors');
var fs = require('fs');
var http = require('http');
var https = require('https');
// instantiate the app
var app = express();

// var privateKey  = fs.readFileSync('/etc/letsencrypt/live/doamin_name.com/privkey.pem', 'utf8');
// var certificate = fs.readFileSync('/etc/letsencrypt/live/doamin_name.com/fullchain.pem', 'utf8');

// var credentials = {key: privateKey, cert: certificate};

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.set('Cache-Control', 'public, max-age=31557600');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Load all of our middleware
// configure app to use bodyParser()
// this will let us get the data from a POST
// app.use(express.static(__dirname + '/client'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());




// this line requires and runs the code from our router.js file and passes it app
app.use('/', require("./routes"));

//use compression
app.use(compression());
// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './view')));

// Save our port
var port = process.env.PORT || 9000;

var httpServer = http.createServer(app);
// var httpsServer = https.createServer(app); uncomment once you have ssl activated
var httpsServer = http.createServer(app);

// Start the server and listen on port
httpsServer.listen(port, function () {
  console.log("Https Listening on port: " + port);
});

// Start the server and listen on port
httpServer.listen(9001, function () {
  console.log("Http Listening on port: " + 9001);
});

// // Start the server and listen on port
// app.listen(port, function () {
//   console.log("Listening on port: " + port);
// });
