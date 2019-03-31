const app = require('../server/app')
const request = require('supertest')(app)
const assert = require('assert')

describe('Main Routes', () => {
	
	it.skip('test throw error',  () => {
		throw new Error('Deu ruim... :/')
	})

	it('get /',  () => {
		return request
			.get('/')
			.expect(200)
			.then((result) => {
				assert.equal('Pong!', result.text)
			})
	})

	it.skip('get /not-found', () => {
		return request
			.get('/not-found')
			.expect(404)
			.then((result) => {
				assert.equal('not found', result.body.message)
			})
	})

	it.skip('get /not-found',  (done) => {
		return request
			.get('/not-found')
			.expect(404)
			.end((err, result) => {
				assert.equal('not found', result.body.message)
				done()
			})
	})
})