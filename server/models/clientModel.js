const mongoose = require('mongoose');
const Provider = require('./providerModel');

const clientSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: [true, 'A client must have a name'],
		unique: true,
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		required: [true, 'A client must have a email'],
	},
	phone: {
		type: Number,
	},
	providers: [{ type: mongoose.Schema.ObjectId, ref: 'Provider' }],
});

clientSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'providers',
		select: '-__v -passwordChangedAt',
	});

	next();
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
