const AppController = require('../controller/AppController')
const ExperienceController = require('../controller/ExperienceController')
const router = require('express').Router()

router.get('/', AppController.index)

router.get('/experiences', ExperienceController.list)
router.post('/experiences', ExperienceController.create)

router.use('/experiences/:id', ExperienceController.validateId)

router.get('/experiences/:id', ExperienceController.byId)
router.put('/experiences/:id', ExperienceController.update)
router.delete('/experiences/:id', ExperienceController.delete)

module.exports = router