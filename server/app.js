const express = require('express');
const app = express();
const cors = require('cors');

const errorController = require('./controllers/errorController');

const clientsRouter = require('./routes/v1/clientsRouter');
const providersRouter = require('./routes/v1/providersRouter');

const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Protrans task API',
			version: '1.0.0',
			description: 'A simple Express Library API',
		},
		servers: [
			{
				url: 'http://localhost:5000',
			},
		],
	},
	apis: ['./sawggerApi.js'],
};

const specs = swaggerJsDoc(options);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/clients', clientsRouter);
app.use('/api/v1/providers', providersRouter);

// API docs router
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.all('*', (req, res, next) => {
	next(
		res.status(404).json({
			status: 'fail',
			message: `Can't find ${req.originalUrl} on this server!`,
		})
	);
});

app.use(errorController);

module.exports = app;
