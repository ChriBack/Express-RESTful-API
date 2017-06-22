var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var uuid = require('uuid');
var router = express.Router();
var cors = require('cors')

//var contents = fs.readFileSync("users.json");
//var jsonContent = JSON.parse(contents);
app.use(cors());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json({ type: 'application/json' }));

var routes = require('./routes');
app.use('/', routes);

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port);

  for (var index = 0; index < 11; index++) {
    console.log(uuid.v1());
  }


})