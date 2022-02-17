const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const verifyToken = require('./utils/token');
require('dotenv').config();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Open routes for registration and login
app.use('/api', authRouter);

// Restricted routes
app.use('/api', verifyToken, indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// send the error
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message,
		},
	});
});

module.exports = app;