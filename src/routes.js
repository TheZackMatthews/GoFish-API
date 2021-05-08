const router = require('express').Router();
const { getDailySurveys } = require('./controllers/dailySurveys');
const { /* getVolunteers, */ saveVolunteers } = require('./controllers/volunteers');
const { getSurveys, saveSurvey } = require('./controllers/survey');

function getRoot(req, res) { // TODO Delete this
  res.status(200);
  res.send('hello express');
}
router.get('/', getRoot); // TODO Delete this

// This might be a post request down the line if we require user have certain credentials
router.get('/getAllSurveys', getDailySurveys);

router.post('./volunteers', saveVolunteers);

router.post('/saveSurvey', saveSurvey);

router.post('/getSurvey', getSurveys);

module.exports = router;
