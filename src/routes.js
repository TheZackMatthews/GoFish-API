const router = require('express').Router();
const { updateVolunteers, getVolunteers, saveVolunteers } = require('./controllers/volunteers');
const {
  getExportData,
  getAllSurveys,
  getSurveysByVolunteersID,
  saveSurvey,
} = require('./controllers/survey');
const { savePhoto, getPhotos, getAllPhotos, getPhotosByCategory } = require('./controllers/photo');

// NOTE This might be a post request down the line if we require user have certain credentials

router.get('/exportdata', getExportData);

router.get('/visit', getVolunteers);
router.post('/visit', saveVolunteers);
router.put('/visit', updateVolunteers);

router.post('/survey', saveSurvey);
router.get('/survey', getAllSurveys);
router.post('/survey', getSurveysByVolunteersID);

router.post('/photo', savePhoto);
router.get('/photo', getAllPhotos);
router.get('/photo/id/:id', getPhotos);
router.get('/photos/:category', getPhotosByCategory);

module.exports = router;
