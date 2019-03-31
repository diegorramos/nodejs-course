const app = require('../app')

console.time()
app.listen(3000, () => {
	console.log('server is up!')
	console.timeEnd()
})