const survey = require('../models/survey');
const { updateDailySurveys } = require('./dailySurveys');
// Provice volunteersId and get all matching surveys
async function getSurveys(req, res) {
  const id = req.body.volunteersId;
  try {
    const allSurveys = await survey.findAll({
      where: {
        volunteerId: id,
      },
    });
    res.status(200).json(allSurveys);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getSurveys failed:', err);
    res.sendStatus(500);
  }
}

async function saveSurvey(req, res) {
  const newSurvey = req.body.survey;
  try {
    survey.create({
      location: newSurvey.location,
      fish_status: newSurvey.fish_status,
      fish_species: newSurvey.fish_species,
      fish_count: newSurvey.fish_count,
      image_url: newSurvey.image_url,
      comments: newSurvey.comments,
    });
    // update the value in dailySurveys
    updateDailySurveys(newSurvey.fish_status, newSurvey.fish_species, newSurvey.fish_count);
    res.status(201).json({
      id: newSurvey.id,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('saveSurvey failed:', err);
    res.sendStatus(500);
  }
}

module.exports = {
  getSurveys,
  saveSurvey,
};
