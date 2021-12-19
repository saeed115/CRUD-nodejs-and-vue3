//handle email or name duplicates
const handleDuplicateKeyError = (err, res) => {
	const field = Object.keys(err.keyValue);
	const code = 409;
	const error = `${field} already exists.`;
	res.status(code).send({ status: 'fail', messages: error });
};

//handle empty fields
const handleValidationError = (err, res) => {
	let errors = Object.values(err.errors).map((el) => el.message);
	let code = 400;

	res.status(code).send({ status: 'fail', messages: errors });
};

//error controller function
module.exports = (err, req, res, next) => {
	try {
		if (err.name === 'ValidationError') return handleValidationError(err, res);
		if (err.code && err.code == 11000) return handleDuplicateKeyError(err, res);
	} catch (error) {
		res.status(500).send('An unknown error occurred.');
	}
};
