const app = require('../app')
const cluster = require('cluster')
const numCpus = require('os').cpus().length


cluster.on('exit', (worker, code, signal) => {
	console.log('exit', signal)
	cluster.fork()
})

if (cluster.isMaster) {
	for(let i = 0; i < numCpus; i++) {
		let worker = cluster.fork()
	}
} else {
	console.time()
	app.listen(3000, () => {
		console.log('server is up!')
		console.timeEnd()
	})
}