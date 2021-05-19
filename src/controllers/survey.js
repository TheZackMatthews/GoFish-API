const { QueryTypes } = require('sequelize');
const { sequelizeConnection } = require('../models');
const Survey = require('../models/survey');
const Volunteer = require('../models/volunteers');
const defaultResponse = require('../assets/defaultResponse.json');

async function getAllSurveys(req, res) {
  try {
    const result = await Survey.findAll();
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
  for (const individualSurvey of rawQuery) {
    const surveyKey = (individualSurvey.fish_status === 'live')
      ? individualSurvey.fish_species
      : `${individualSurvey.fish_species}_${individualSurvey.fish_status}`;
    // If the groupId is already present, push it to the corresponding array
    if (formattedQuery[individualSurvey.group_id]) {
      formattedQuery[individualSurvey.group_id][surveyKey] += parseInt(individualSurvey.sum, 10);
    } else {
      // If the group_id is not present, add it as a key value pair with the current survey
      formattedQuery[individualSurvey.group_id] = { ...defaultResponse };
      const newGroup = formattedQuery[individualSurvey.group_id];
      newGroup[surveyKey] = parseInt(individualSurvey.sum, 10);
      const volunteerTable = await Volunteer.findOne({
        where: { group_id: individualSurvey.group_id },
      });
      newGroup.creek_name = volunteerTable.dataValues.creek_name;
      newGroup.visibility = volunteerTable.dataValues.visibility;
      newGroup.flow_type = volunteerTable.dataValues.flow_type;
      newGroup.view_condition = volunteerTable.dataValues.view_condition;
      newGroup.day_end_comments = volunteerTable.dataValues.day_end_comments;
      newGroup.water_condition = volunteerTable.dataValues.water_condition;
      newGroup.date = volunteerTable.dataValues.createdAt;
      console.log('🌵', (formattedQuery[individualSurvey.group_id]));
    }
  }
  console.log('🌭', formattedQuery);
  res.status(200).json(Object.values(formattedQuery));
}

// Provice group_id and get all matching surveys
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

// Recieve a new survey, save it both as a single instance and update the value of dailySurveys
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
