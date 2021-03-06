const express = require('express');
const uuid = require('uuid');
const fs = require('fs');
const Buffer = require('buffer').Buffer;

const router = express.Router();

router.use((req, res, next) => {

	res.setHeader('Content-Type', 'application/json');
	next();

});

router.post('/upload', (req, res) => {

	let body = req.body,
		data = null;
	let ext = body.file.substr(0, 22).match(/(jpg|jpeg|png|gif)/)[0],
		file = body.file.substr(22);
	let fileName = `${uuid.v1({msec: new Date().getTime()})}.${ext}`;

	fs.writeFile(`public/upload/${fileName}`, new Buffer(file, 'base64'), (err) => {
		if (err) {
			data = {
				readyState: 0,
				error_message: 'Upload failed.'
			};
		} else {
			data = {
				readyState: 1,
				image: `/upload/${fileName}`
			};
		}
		res.json(data);
	});

});

module.exports = router;
