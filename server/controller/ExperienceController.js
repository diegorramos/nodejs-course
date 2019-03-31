const repository = require('../repository/ExperienceRepository')
const ExperienceController = {

	list(request, response, next) {
		repository.list((err, data) => {
			response.send(data)
		})
	},

	byId(request, response, next) {
		const id = request.params.id
		repository.byId(id,  (err, data) => {
			response.send(data)
		})
	},

	create(request, response, next) {
		let body = request.body
		repository.create(body,  (err, data) => {
			response.status(201).json(data)
		})
	},

	update(request, response, next) {
		let id = request.params.id
		let body = request.body
		repository.update(id, body, (err, data) => {
			response.json(data)
		})
	},

	delete(request, response, next) {
		let id = request.params.id
		repository.delete(id, (err, data) => {
			response.sendStatus(204)
		})
	},

	validateId(request, response, next) {
		const id = request.params.id
		if (id.length !== 24) {
			let err = new Error('Invalid id, length: ' + id.length)
			err.status = 422
			return next(err)
		}
		next()
	}
}

module.exports = ExperienceController