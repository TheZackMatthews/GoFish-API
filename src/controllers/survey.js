const survey = require('../models/survey');

async function getAllSurveys(req, res) {
  try {
    const allSurveys = await survey.findAll();
    res.status(200).json(allSurveys);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getAllSurveys failed:', err);
    res.json(500);
  }
}

// Provice volunteersId and get all matching surveys
async function getSurveysByVolunteersID(req, res) {
  const id = req.body.volunteersId;
  try {
    const allSurveys = await survey.findAll({
      where: {
        volunteersId: id,
      },
    });
    res.status(200).json(allSurveys);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getSurveys failed:', err);
    res.json(500);
  }
}

// Recieve a new survey, save it both as a single instance and update the value of dailySurveys
async function saveSurvey(req, res) {
  const newSurvey = req.body.survey;
  const id = req.body.volunteersId;
  try {
    await survey.create({
      location: newSurvey.location,
      fish_status: newSurvey.fish_status,
      fish_species: newSurvey.fish_species,
      fish_count: newSurvey.fish_count,
      image_url: newSurvey.image_url,
      comments: newSurvey.comments,
      volunteersId: id,
    });
    res.status(201).json({ id: newSurvey.id });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('saveSurvey failed:', err);
    res.sendStatus(500);
  }
}

module.exports = {
  getAllSurveys,
  getSurveysByVolunteersID,
  saveSurvey,
};
