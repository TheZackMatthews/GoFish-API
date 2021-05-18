const { QueryTypes } = require('sequelize');
const { sequelizeConnection } = require('../models');
const surveyModel = require('../models/survey');
const volunteerModel = require('../models/volunteers');
const defaultResponse = require('../assets/defaultResponse.json');

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
  const formattedQuery = {};
  const rawQuery = await sequelizeConnection.query(
    'SELECT surveys.group_id, fish_species, fish_status, SUM (fish_count) FROM surveys GROUP BY surveys.group_id, fish_species, fish_status',
    {
      raw: true,
      type: QueryTypes.SELECT,
    },
  );
  // eslint-disable-next-line no-restricted-syntax
  for (const survey of rawQuery) {
    const surveyKey = (survey.fish_status === 'live')
      ? survey.fish_species
      : `${survey.fish_species}_${survey.fish_status}`;
    // If the groupId is already present, push it to the corresponding array
    if (formattedQuery[survey.group_id]) {
      formattedQuery[survey.group_id][surveyKey] += parseInt(survey.sum, 10);
    } else {
      // If the group_id is not present, add it as a key value pair with the current survey
      formattedQuery[survey.group_id] = { ...defaultResponse };
      const newGroup = formattedQuery[survey.group_id];
      newGroup[surveyKey] = parseInt(survey.sum, 10);
      const volunteerTable = await volunteerModel.findOne({
        where: { group_id: survey.group_id },
      });
      newGroup.creek_name = volunteerTable.dataValues.creek_name;
      newGroup.visibility = volunteerTable.dataValues.visibility;
      newGroup.flow_type = volunteerTable.dataValues.flow_type;
      newGroup.view_condition = volunteerTable.dataValues.view_condition;
      newGroup.day_end_comments = volunteerTable.dataValues.day_end_comments;
      newGroup.water_condition = volunteerTable.dataValues.water_condition;
      newGroup.date = volunteerTable.dataValues.createdAt;
      console.log('🌵', (formattedQuery[survey.group_id]));
    }
  }
  console.log('🌭', formattedQuery);
  res.status(200).json(Object.values(formattedQuery));
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
    let result = await surveyModel.create({
      location: survey.location,
      fish_status: survey.fish_status,
      fish_species: survey.fish_species,
      fish_count: survey.fish_count,
      comments: survey.comments || '',
      group_id: id,
    });
    res.status(201).json({ id: result.id });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('saveSurvey failed:', err);
    res.sendStatus(500).json(err.message);
  }
}

module.exports = {
  getAllSurveys,
  getExportData,
  getSurveysByVolunteersID,
  saveSurvey,
};
