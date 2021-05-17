const volunteerModel = require('../models/volunteers');

async function getVolunteers(req, res) {
  try {
    const reports = await volunteerModel.findAll();
    res.status(200).json(reports);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getSurveys failed:', err);
    res.sendStatus(500);
  }
}

async function saveVolunteers(req, res) {
  const volunteers = req.body;
  try {
    const result = await volunteerModel.create({
      creek_name: volunteers.creekName,
      team_lead: volunteers.teamLead,
      team_members: volunteers.teamMembers,
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
  await volunteerModel.update(volunteersInfo, {
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
