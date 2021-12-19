const Client = require('../models/clientModel');

exports.getClients = async (req, res) => {
	try {
		let query = Client.find();

		//Pagination
		const page = req.query.page * 1 || 1;
		const limit = req.query.limit * 1 || 50;
		const skip = (page - 1) * limit;

		query = query.skip(skip).limit(limit);

		if (req.query.page) {
			const numClient = await Client.countDocuments();
			console.log(skip);
			console.log(numClient);
			if (skip >= numClient) {
				throw new Error('This page not found');
			}
		}

		const clients = await query;

		res.status(201).json({
			status: 'success',
			result: clients.length,
			data: {
				clients,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: error.message,
		});
	}
};

exports.createClient = async (req, res, next) => {
	try {
		const newClient = await Client.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				client: newClient,
			},
		});
	} catch (err) {
		next(err);
	}
};

exports.getClient = async (req, res) => {
	try {
		const client = await Client.findById(req.params.id);

		if (!client) return;

		res.status(201).json({
			status: 'success',
			data: {
				client,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: 'No client found with that ID',
		});
	}
};

exports.updateClient = async (req, res) => {
	try {
		const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(201).json({
			status: 'success',
			data: {
				client,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: 'No client found with that ID',
		});
	}
};

exports.deleteClient = async (req, res) => {
	try {
		await Client.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: 'No client found with that ID',
		});
	}
};
