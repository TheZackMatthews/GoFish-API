const survey = require('../models/survey');
// Provice volunteersId and get all matching surveys
async function getSurveysByVolunteersID(req, res) {
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

// Recieve a new survey, save it both as a single instance and update the value of dailySurveys
async function saveSurvey(req, res) {
  const newSurvey = req.body.survey;
  const { id } = req.body.volunteersId;
  try {
    survey.create({
      location: newSurvey.location,
      fish_status: newSurvey.fish_status,
      fish_species: newSurvey.fish_species,
      fish_count: newSurvey.fish_count,
      image_url: newSurvey.image_url,
      comments: newSurvey.comments,
      volunteersId: id,
    });
    res.status(201).json({ id: newSurvey.id });
    // Outdated! Keeping this section only if we can't query for that data ----------------------
    // update the value in dailySurveys
    // const isSaved = updateDailySurveys(
    //   id,
    //   newSurvey.fish_status,
    //   newSurvey.fish_species,
    //   newSurvey.fish_count,
    //   newSurvey.comments,
    // );
    // if (isSaved) res.status(201).json({ id: newSurvey.id });

    // // If we were unable to save this report as a part of dailySurveys, return "Not Implemented"
    // res.sendStatus(501);
    // ---------------------------------
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('saveSurvey failed:', err);
    res.sendStatus(500);
  }
}

module.exports = {
  getSurveysByVolunteersID,
  saveSurvey,
};
