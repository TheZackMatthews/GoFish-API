const allSurveys = require('../models/dailySurveys');

async function getDailySurveys(req, res) {
  try {
    const reports = await allSurveys.findAll();
    res.status(200).json(reports);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getSurveys failed:', err);
    res.sendStatus(500);
  }
}

// Called in survey controller, update one field of dailySurveys by an unknown number
async function updateDailySurveys(id, fishStatus, fishSpecies, fishCount) {
  const whichField = `${fishSpecies}_${fishStatus}`;
  try {
    allSurveys.increment(
      whichField,
      { by: fishCount, where: { volunteerId: id } },
    );
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('updateDailySurveys failed:', err);
    return false;
  }
}
module.exports = {
  getDailySurveys,
  updateDailySurveys,
};
