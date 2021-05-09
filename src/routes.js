const router = require('express').Router();
const { getDailySurveys } = require('./controllers/dailySurveys');
const { getVolunteers, saveVolunteers } = require('./controllers/volunteers');
const { getSurveys, saveSurvey } = require('./controllers/survey');

function getRoot(req, res) { // TODO Delete this
  res.status(200);
  res.send('hello express');
}
router.get('/', getRoot); // TODO Delete this

// NOTE This might be a post request down the line if we require user have certain credentials
// Get all surveys a group of fieldworkers submitted in a given session
router.get('/getAllSurveys', getDailySurveys);

// NOTE This might be a post request down the line if we require user have certain credentials
router.get('/getAllVolunteers', getVolunteers);

// NOTE If a user logged out, and then back in, it would currently create two seperate volunteerIds.
router.post('./volunteers', saveVolunteers);

// Save an individual survey
router.post('/saveSurvey', saveSurvey);

// Provide a volunteerId and get all the surveys they submitted
router.post('/getSurveys', getSurveys);

// TODO need a route that provides a dailySurvey day_end_comments

module.exports = router;
