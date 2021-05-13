const volunteers = require('../models/volunteers');

async function getVolunteers(req, res) {
  try {
    const reports = await volunteers.findAll();
    res.status(200).json(reports);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getSurveys failed:', err);
    res.sendStatus(500);
  }
}

async function saveVolunteers(req, res) {
  const newVolunteers = req.body;
  try {
    let result = await volunteers.create({
      creek_name: newVolunteers.creekName,
      team_lead: newVolunteers.teamLead,
      team_members: newVolunteers.teamMembers,
    });
    res.status(201).json({
      volunteersId: result.volunteersId,
      startedAt: result.started_at,  
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('saveVolunteers failed:', err);
    res.sendStatus(500);
  }
}
module.exports = {
  getVolunteers,
  saveVolunteers,
};
