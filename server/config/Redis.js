const bird = require('bluebird')
const redis = require('redis')

bird.promisifyAll(redis.RedisClient.prototype)
bird.promisifyAll(redis.Multi.prototype)

const client = redis.createClient({
	host: '10.0.2.166',
	port: 6379
})

module.exports = client