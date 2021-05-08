const allSurveys = require('../models/dailySurveys');

async function getSurveys(req, res) {
  try {
    const reports = await allSurveys.findAll();
    res.status(200).json(reports);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.Error('getSurveys failed:', err);
    res.sendStatus(500);
  }
}

module.exports = {
  getSurveys,
};
