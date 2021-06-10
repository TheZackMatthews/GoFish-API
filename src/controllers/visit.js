const Visit = require('../models/visit');

async function getVolunteers(req, res) {
  try {
    const reports = await Visit.findAll();
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
    const result = await Visit.create({
      creek_name: newVolunteers.creekName,
      team_lead: newVolunteers.teamLead,
      team_members: newVolunteers.teamMembers,
      started_at: Date.now(),
    });
    res.status(201).json({
      group_id: result.group_id,
      startedAt: result.started_at,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('saveVolunteers failed:', err);
    res.sendStatus(500);
  }
}

async function updateVolunteers(req, res) {
  const volunteersInfo = {
    ended_at: Date.now(),
    distance_walked: req.body.distanceWalked,
    water_condition: req.body.waterCondition,
    view_condition: req.body.viewCondition,
    day_end_comments: req.body.dayEndComments,
    flow_type: req.body.flowType,
    visibility: req.body.visibility,
  };
  await Visit.update(volunteersInfo, {
    where: {
      group_id: req.body.group_id,
    },
  })
    .then(res.sendStatus(200))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.sendStatus(500);
    });
}

module.exports = {
  getVolunteers,
  saveVolunteers,
  updateVolunteers,
};
