const router = require('express').Router();

router.get('/', getRoot);

// router.post('/saveReport' /* Controller function here */);

// // This might be a post request down the line, if we require user have certain credentials
// router.get('/getAllReports' /* Controller function here */);

function getRoot(req, res) {
  res.status(200);
  res.send('hello express');
}

module.exports = router;
