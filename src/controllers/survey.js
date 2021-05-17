const { QueryTypes } = require('sequelize');
const { sequelizeConnection } = require('../models');
const surveyModel = require('../models/survey');

async function getAllSurveys(req, res) {
  try {
    const result = await surveyModel.findAll();
    res.status(200).json(result);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).json();
  }
}

async function getExportData(req, res) {
  const formattedQuery = [];
  sequelizeConnection.query(
    'SELECT surveys.group_id, fish_species, fish_status, SUM (fish_count) FROM surveys GROUP BY surveys.group_id, fish_species, fish_status',
    {
      raw: true,
      type: QueryTypes.SELECT,
    },
  )
    .then((rawQuery) => {
      const groupId = rawQuery[0].group_id;
      console.log('🌊', groupId);
      rawQuery.forEach((survey, i) => {
        formattedQuery[i] = survey;
        const newKey = (survey.fish_status === 'live')
          ? survey.fish_species
          : `${survey.fish_species}_${survey.fish_status}`;
        formattedQuery[i][newKey] = survey.sum;
      });
      res.status(200).json(formattedQuery);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error('getExportData failed:', err);
      res.status(500).json();
    });
}

// Provice group_id and get all matching surveys
async function getSurveysByVolunteersID(req, res) {
  const id = req.body.group_id;
  try {
    const allSurveys = await surveyModel.findAll({
      where: {
        group_id: id,
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
  const id = req.body.group_id;
  try {
    await surveyModel.create({
      location: survey.location,
      fish_status: survey.fish_status,
      fish_species: survey.fish_species,
      fish_count: survey.fish_count,
      comments: survey.comments,
      group_id: id,
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
  getExportData,
  getSurveysByVolunteersID,
  saveSurvey,
};
