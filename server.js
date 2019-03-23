const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();

// TODO: add cleaning of the uploads folder, everytime new upload is made, for server space presservation sake

// taken from multer documentation
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
});

// instance of multer upload here because of how error handling in multer is shown in documentation
const upload = multer({
	storage: storage,
	limits: { fileSize: (5 * 1024 * 1024) }
}).single('upfile');

app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', (req, res) => {
	res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', (req, res) => {
	res.json({ greetings: "Hello, API" });
});

app.post('/api/fileanalyse', (req, res) => {
	upload(req, res, (err) => {
		if(err && err.code === 'LIMIT_FILE_SIZE') {
			res.json({ error: 'File size too large. Maximum file Size is 5 Megabytes' });
		} else if(err) {
			res.json({ error: 'Cannot upload the file' });
		} else {
			const resObject = {
				name: req.file.originalname,
				size: req.file.size,
				type: req.file.mimetype
			};
			res.json(resObject);
		}
	});
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
