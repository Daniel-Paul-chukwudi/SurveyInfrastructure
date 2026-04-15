const router = require('express').Router()
const {addSurvey,getAll,completeSurvey,getAllFromDb,completeSurveyFromDb} = require('../controller/surveyController')

router.post('/survey',addSurvey)

router.post('/survey/:id/:Sid',completeSurvey)

router.get('/survey',getAll)

router.get('/Dsurvey',getAllFromDb)

router.post('/Dsurvey/:id/:Sid',completeSurveyFromDb)

module.exports = router
