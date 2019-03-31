const repository = require('../repository/ExperienceRepository')
const redis = require('../config/redis')

const ExperienceController = {

	listFromCache(request, response, next) {
		redis.getAsync('diegorocha:list')
		.then(result => {
			let data = JSON.parse(result)
			response.json(data)
		})
		.catch(err => next())
	},

	list(request, response, next) {
		repository.listAsync()
		.then(data => {
			redis.setAsync('diegorocha:list', JSON.stringify(data)).catch(err => console.log(err))
			response.json(data)
		})
		.catch(next)
	},

	byId(request, response, next) {
		const id = request.params.id
		repository.byIdAsync(id)
			.then(data => {
				response.send(data)
			})
			.catch(next)
	},

	create(request, response, next) {
		let body = request.body
		repository.createAsync(body)
			.then(data => {
				response.status(201).json(data)
			})
			.catch(next)
	},

	update(request, response, next) {
		let id = request.params.id
		let body = request.body
		repository.updateAsync(id, body)
			.then(data => {
				response.json(data)
			})
			.catch(next)
	},

	delete(request, response, next) {
		let id = request.params.id
		repository.deleteAsync(id)
			.then(data => {
				response.sendStatus(204)
			})
			.catch(next)
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