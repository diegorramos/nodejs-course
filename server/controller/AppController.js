const AppController = {
	index(request, response, next) {
		response.send('Pong!')
	},

	notFound(request, response, next) {
		let err = new Error('not found')
		error.status = 404
		next(err)
	},

	handleError(err, request, response, next) {
		let status = err.status || 500
		response.status(status)
		response.json({ message: err.message })
	}
}

module.exports = AppController