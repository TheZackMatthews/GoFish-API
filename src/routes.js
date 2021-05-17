const router = require('express').Router();
const { updateVolunteers, getVolunteers, saveVolunteers } = require('./controllers/volunteers');
const { getExportData, getAllSurveys, getSurveysByVolunteersID, saveSurvey } = require('./controllers/survey');
const { savePhoto, getPhotos, getPhotosByCategory } = require('./controllers/photo');

// NOTE This might be a post request down the line if we require user have certain credentials
// Get all surveys a group of fieldworkers submitted in a given session
router.get('/getExportData', getExportData);

router.get('/getAllSurveys', getAllSurveys);

// NOTE This might be a post request down the line if we require user have certain credentials
router.get('/getAllVolunteers', getVolunteers);

// NOTE If a user logged out and then back in, it would currently create two seperate volunteerIds.
router.post('/saveVolunteers', saveVolunteers);

// Save visibility info and day end comment
router.put('/saveVolunteers', updateVolunteers);

// Save an individual survey
router.post('/saveSurvey', saveSurvey);

// Provide a volunteerId and get all the surveys they submitted
router.post('/getSurveys', getSurveysByVolunteersID);

// Save an image during a survey submission
router.post('/savePhoto', savePhoto);

// Get all photos
router.post('/getPhotos', getPhotos);

// Get photos from category: 'help identifying', 'outreach', or 'other'
router.post('/getPhotos:category', getPhotosByCategory);

module.exports = router;
