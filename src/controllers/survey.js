const { QueryTypes } = require('sequelize');
const { sequelizeConnection } = require('../models');
const surveyModel = require('../models/survey');
const volunteerModel = require('../models/volunteers');
// 'SELECT fish_species, SUM (fish_count) FROM surveys GROUP BY fish_species'
async function getAllSurveys(req, res) {
  const ret = {};
  sequelizeConnection.query('SELECT fish_species, fish_status, SUM (fish_count) FROM surveys GROUP BY fish_species, fish_status', {
    raw: true,
    type: QueryTypes.SELECT,
  })
    .then((result) => {
      result.forEach((survey) => {
        const newKey = (survey.fish_status === 'live') ? survey.fish_species : `${survey.fish_species}_${survey.fish_status}`;
        ret[newKey] = survey.sum;
      });
      res.status(200).json(ret);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error('getAllSurveys failed:', err);
      res.status(500).json();
    });
}

// Provice volunteersId and get all matching surveys
async function getSurveysByVolunteersID(req, res) {
  const id = req.body.volunteersId;
  try {
    const allSurveys = await surveyModel.findAll({
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
  const { survey } = req.body;
  const id = req.body.volunteersId;
  try {
    await surveyModel.create({
      location: survey.location,
      fish_status: survey.fish_status,
      fish_species: survey.fish_species,
      fish_count: survey.fish_count,
      image_url: survey.image_url,
      comments: survey.comments,
      volunteersId: id,
    });
    res.status(201).json({ id: survey.id });
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
