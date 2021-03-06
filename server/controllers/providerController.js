const Provider = require('../models/providerModel');

exports.getProviders = async (req, res) => {
	try {
		const providers = await Provider.find();

		res.status(201).json({
			status: 'success',
			result: providers.length,
			data: {
				providers,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: error,
		});
	}
};

exports.createProvider = async (req, res, next) => {
	try {
		const newProvider = await Provider.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				provider: newProvider,
			},
		});
	} catch (err) {
		next(err);
	}
};

exports.getProvider = async (req, res) => {
	try {
		const provider = await Provider.findById(req.params.id);

		res.status(201).json({
			status: 'success',
			data: {
				provider,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: err,
		});
	}
};

exports.updateProvider = async (req, res) => {
	try {
		const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(201).json({
			status: 'success',
			data: {
				provider,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: error,
		});
	}
};

exports.deleteProvider = async (req, res) => {
	try {
		await Provider.findByIdAndDelete(req.params.id);

		res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			message: error,
		});
	}
};
