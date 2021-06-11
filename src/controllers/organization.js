const Sequelize = require('sequelize');
const Organization = require('../models/organization');
const User = require('../models/user');

exports.getAllOrgs = async (req, res) => {
  try {
    const result = await Organization.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

// add error handling for adding the same person
exports.addUserToOrg = async (req, res) => {
  const { user_id, org_id } = req.body;
  try {
    const userResult = await User.update({
      org_id
    },{ 
      where: { user_id },
      returning: true,
    })
    let orgResult = await Organization.findOne({ where: { org_id }})
    if (orgResult.user_id) {
      const userAdd = orgResult.user_id.concat(user_id);
      orgResult.user_id = userAdd;
    } else {
      orgResult.user_id = [user_id];
    }
    orgResult = await orgResult.save();
    res.status(200).json(orgResult)
  } catch (error) {
    res.status(500).json(error.message);
  }
}