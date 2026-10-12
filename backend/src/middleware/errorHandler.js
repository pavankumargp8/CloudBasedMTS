export class HttpError extends Error {
	constructor(status, message, details) {
		super(message);
		this.status = status;
		this.details = details;
	}
}

export function errorHandler(err, _req, res, _next) {
	if (err.name === 'ZodError') {
		return res.status(400).json({ error: 'Validation failed', details: err.issues });
	}

	const status = err.status || 500;
	if (status === 500) console.error(err);
	res.status(status).json({
		error: status === 500 ? 'Internal server error' : err.message,
		details: err.details,
	});
}
