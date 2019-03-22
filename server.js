'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
	res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function (req, res) {
	res.json({ greetings: "Hello, API" });
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log(`Server started on port ${port}`);
});