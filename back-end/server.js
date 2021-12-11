const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = require('./app');

mongoose
	.connect(process.env.MONGO_URI)
	.then((con) => {
		console.log('connected');
	})
	.catch((err) => {
		console.log(err);
	});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log('app running');
});
