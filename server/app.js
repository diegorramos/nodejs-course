const express = require('express')
const app = express()
const AppController = require('./controller/AppController')
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(require('./route'))
app.use(AppController.notFound)
app.use(AppController.handleError)

// app.listen(3000)
module.exports = app