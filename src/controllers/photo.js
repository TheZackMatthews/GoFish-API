const photo = require('../models/photo');

async function savePhoto(req, res) {
  const id = req.body.surveyId;
  const newPhoto = req.body.photo;
  try {
    await photo.create({
      image_url: newPhoto.photoURL,
      reason_for_submission: newPhoto.reasonForSubmission,
      comment: newPhoto.comment,
    });
    res.status(201).json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('savePhoto failed:', err);
    res.status(400).json();
  }
}

async function getPhotos(req, res) {
  try {
    const allPhotos = await photo.findAll();
    res.status(200).json(allPhotos);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getPhotos failed:', err);
    res.status(500).json();
  }
}

async function getPhotosByCategory(req, res) {}
  const reasonForSubmission = req
  try {
    const categoryPhotos = await photo.findAll({
      where: {
        reason_for_submission:
      }
    });
    res.status(200).json(categoryPhotos);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getPhotos failed:', err);
    res.status(500).json();
  }
  module.exports = {
    savePhoto,
    getPhotos,
    getPhotosByCategory,
};
