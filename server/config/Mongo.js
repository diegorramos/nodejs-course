const mongojs = require('mongojs')

let mongoUri;
if (process.env.NODE_ENV === 'test') {
	mongoUri = 'localhost:27017/disney-test'
} else {
	mongoUri = 'localhost:27017/disney'
}
const db = mongojs(mongoUri)

db.on('error', (err) => {
	console.log('caiuuu TI', err)
})

module.exports = db