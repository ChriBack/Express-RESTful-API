var fs = require("fs");
var contents = fs.readFileSync("./users.json");
var jsonContent = JSON.parse(contents);
var uuid = require('uuid');

module.exports = {

	getUsers: function (req, res) {
		console.log(jsonContent);
		res.send(jsonContent);
		res.end();
	},
	getUser: function (req, res) {
		users = jsonContent;
		var result = users.filter(function (obj) {
			return obj.id == req.params.id;
		});
		if (result.length != 0) {
			console.log(result);
			res.end(JSON.stringify(result));
		}
		else {
			res.status(400);
			res.send('None shall pass');
		}
	},
	postUser: function (req, res) {
		var newUser = req.body.user;
		newUser.id = uuid.v1();
		jsonContent.push(newUser);
		res.send(jsonContent);
		res.end();
	},
	deleteUser: function (req, res) {
		users = jsonContent;
		var found = false;
		for (var i = 0; i < users.length; i++) {
			if (users[i].id == req.params.id) {
				users.splice(i, 1);
				found = true;
				break;
			}
		}
		if (found) {
			console.log(users);
			res.send(users);
			res.end();
		}
		else {
			res.status(400);
			res.send('No user with id "' + req.params.id + '" available');
		}
	}
}