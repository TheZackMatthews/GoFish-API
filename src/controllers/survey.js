const survey = require('../models/survey');

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
    console.Error('getSurveys failed:', err);
    res.sendStatus(500);
  }
}

async function saveSurvey(req, res) {
  const newSurvey = req.body.volunteers;
  survey.create({
    location: newSurvey.location,
    fish_status: newSurvey.fish_status,
    fish_species: newSurvey.fish_species,
    fish_count: newSurvey.fish_count,
    image_url: newSurvey.image_url,
    comments: newSurvey.comments,
  });
  res.status(201).json({
    id: newSurvey.id,
  });
}

module.exports = {
  getSurveys,
  saveSurvey,
};
