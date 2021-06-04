const { QueryTypes } = require('sequelize');
const { sequelizeConnection } = require('../models');
const Survey = require('../models/survey');
const Volunteer = require('../models/volunteers');
const defaultResponse = require('../assets/defaultResponse.json');
const DailySurvey = require('../models/dailySurveys');

async function getAllSurveys(req, res) {
  Survey.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).json();
    });
}

async function getExportData(req, res) {
  DailySurvey.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).json();
    });
}

// Provide group_id and get all matching surveys
async function getSurveysByVolunteersID(req, res) {
  const id = req.body.group_id;
  try {
    const allSurveys = await Survey.findAll({
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

// Receive a new survey, save it both as a single instance and update the value of dailySurveys
async function saveSurvey(req, res) {
  const { survey } = req.body;
  const id = req.body.group_id;
  try {
    const result = await Survey.create({
      location: survey.location,
      fish_status: survey.fish_status,
      fish_species: survey.fish_species,
      fish_count: survey.fish_count,
      comments: survey.comments || '',
      group_id: id,
    });
console.log('test')
    const aggregateTable = await DailySurvey.findOrCreate({
      where: { group_id: id },
    });

    const whichField = `${survey.fish_species}_${survey.fish_status}`;
    await aggregateTable.increment(
      whichField,
      { by: survey.fish_count, where: { group_id: id } },
    );
    if (survey.comments) {
      await aggregateTable.update(
        { individual_survey_comments: sequelizeConnection.fn('array_append', sequelizeConnection.col('individual_survey_comments'), survey.comments) },
        { where: { group_id: id } },
      );
    }
    res.status(201).json({ id: result.id });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('saveSurvey failed:', err);
    res.status(500).json(err.message);
  }
}

module.exports = {
  getAllSurveys,
  getExportData,
  getSurveysByVolunteersID,
  saveSurvey,
};
