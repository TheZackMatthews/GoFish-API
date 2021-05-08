const router = require('express').Router();
const { getSurveys } = require('./controllers/dailySurveys');

function getRoot(req, res) { // TODO Delete this
  res.status(200);
  res.send('hello express');
}
router.get('/', getRoot); // TODO Delete this

// router.post('/saveReport' /* Controller function here */);

// // This might be a post request down the line, if we require user have certain credentials
router.get('/getAllReports', getSurveys);

module.exports = router;
