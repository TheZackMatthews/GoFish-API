const volunteers = require('../models/volunteers');

async function getVolunteers(req, res) {
  try {
    const reports = await volunteers.findAll();
    res.status(200).json(reports);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.Error('getSurveys failed:', err);
    res.sendStatus(500);
  }
}

async function saveVolunteers(req, res) {
  const newVolunteers = req.body.volunteers;
  volunteers.create({
    creek_name: newVolunteers.creek_name,
    team_lead: newVolunteers.team_lead,
    team_members: newVolunteers.team_members,
    ended_at: newVolunteers.ended_at,
    distance_walked: newVolunteers.distance_walked,
    water_condition: newVolunteers.water_condition,
    view_condition: newVolunteers.view_condition,
  });
  res.status(201).json({
    volunteersId: newVolunteers.id,
  });
}

module.exports = {
  getVolunteers,
  saveVolunteers,
};
