const Photo = require('../models/photo');

async function savePhoto(req, res) {
  const id = req.body.surveyId; // FIXME change to group_id
  const newPhoto = req.body.photo;
  try {
    const savedPhoto = await Photo.create({
      image_url: newPhoto.photoURL,
      reason_for_submission: newPhoto.reasonForSubmission,
      comment: newPhoto.comment,
      group_id: id,
    });
    res.status(201).json(savedPhoto);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('savePhoto failed:', err);
    res.status(400).json();
  }
}

async function getPhotos(req, res) {
  try {
    const allPhotos = await Photo.findAll();
    res.status(200).json(allPhotos);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getPhotos failed:', err);
    res.status(500).json();
  }
}

async function getPhotosByCategory(req, res) {
  const reasonForSubmission = req.params.category;
  try {
    const categoryPhotos = await Photo.findAll({
      where: {
        reason_for_submission: reasonForSubmission,
      },
    });
    res.status(200).json(categoryPhotos);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('getPhotosByCategory failed:', err);
    res.status(500).json();
  }
}
module.exports = {
  savePhoto,
  getPhotos,
  getPhotosByCategory,
};
