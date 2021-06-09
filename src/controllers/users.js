const { QueryTypes } = require('sequelize');
const { sequelizeConnection } = require('../models');
const User = require('../models/user');

exports.newUser = async (req, res) => {
  const { uid, email, name } = req.body;
  const newUser = { uid, email, display_name: name }
  try {
    const result = await User.create(newUser);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

exports.getUser = async (req, res) => {
  const { uid } = req.params;
  try {
    const result = await User.findOne({ where: { uid } })
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
}

exports.updateUser = async (req, res) => {
  const { uid, update } = req.body;
  console.log(update)
  try {
    const result = await User.update(
      update,
      { 
        where: { uid }, 
        returning: true 
      })
    res.status(200).json(result[1][0]);
  } catch (error) {
    res.status(400).json(error.message);
  }
}