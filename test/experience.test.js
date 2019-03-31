const app = require('../server/app')
const request = require('supertest')(app)
const assert = require('assert')
const db = require('../server/config/mongo')

describe('experiences routes', () => {
	let id;
	beforeEach((done) => {
		let obj = { name: 'Restaurante a Bela e a fera' }
		db.collection('experiences').insert(obj, (err, result) => {
			id = result._id.toString()
			done()
		})
	})
	afterEach((done) => {
		db.collection('experiences').remove({}, done)
	})

	it('get /experiences', () => {
		return request
			.get('/experiences')
			.expect(200)
			.then((result) => {
				assert.ok(result.body.length)
				assert.equal(result.body.length, 1)
				assert.equal(result.body[0].name, 'Restaurante a Bela e a fera')
			})
	})

	it('get /experiences/:id', () => {
		return request
			.get(`/experiences/${id}`)
			.expect(200)
			.then((result) => {
				assert.equal(result.body._id, id)
				assert.equal(result.body.name, 'Restaurante a Bela e a fera')
			})
	})

	it('post /experiences', () => {
		let obj = { name: 'Castelo das Princesas' }
		return request
			.post('/experiences')
			.send(obj)
			.expect(201)
			.then((result) => {
				assert.ok(result.body._id)
				assert.ok(result.body.name)
			})	
	})

	it('put /experiences/:id', () => {
		let obj = { name: 'Castelo duck tales' }
		return request
			.put(`/experiences/${id}`)
			.send(obj)
			.expect(200)
			.then((result) => {
				assert.deepEqual(result.body, { n: 1, nModified: 1, ok: 1 })
			})
	})

	it('delete /experiences/:id', () => {
		return request
			.delete(`/experiences/${id}`)
			.expect(204)
			.then((result) => {
				assert.equal(result.text, '')
			})
	})

	it('validate id', () => {
		return request
			.delete('/experiences/100')
			.expect(422)
			.then((result) => {
				assert.equal('Invalid id, length: 3', result.body.message)
			})
	})
})