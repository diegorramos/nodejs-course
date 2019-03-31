const mongojs = require('mongojs')
const db = mongojs('localhost:27017/disney')

db.on('error', (err) => {
	console.log('caiuuu TI', err)
})

module.exports = db