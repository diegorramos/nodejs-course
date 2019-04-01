const AppController = require('../controller/AppController')
const ExperienceController = require('../controller/ExperienceController')
const router = require('express').Router()
const jwt = require('jwt-simple')
const SECRET = 'na-boa'

router.get('/', AppController.index)

router.get('/novatec', (request, response, next) => {
	response.render('index', { title: 'Domingo de Curso' })
})

router.get('/experiences', ExperienceController.listFromCache, ExperienceController.list)
router.post('/experiences', ExperienceController.create)

router.use('/experiences/:id', ExperienceController.validateId)

router.get('/experiences/:id', ExperienceController.byId)
router.put('/experiences/:id', ExperienceController.update)
router.delete('/experiences/:id', ExperienceController.delete)

module.exports = router