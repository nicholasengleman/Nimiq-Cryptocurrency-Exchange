const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();
const path = require('path');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://engleman:11july2017@ds051630.mlab.com:51630/nimiq-exchange');


const {User} = require('./models/user');
const {auth} = require('./middleware/auth');


app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


// POST //
app.post('/api/register', (req, res) => {
	console.log(req);
	const user = new User(req.body);

	user.save((err, doc) => {
		if (err) {
			return res.json({error: err});
		} else {
			user.generateToken((err, user) => {
				if (err) {
					return res.status(400).send(err);
				} else {
					res.cookie('auth', user.token).json({
						success: true,
						id: doc._id,
						email: doc.email
					});
				}
			});
		}
	})
});



























app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '../client/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
	console.log('SERVER RUNNING');
});
