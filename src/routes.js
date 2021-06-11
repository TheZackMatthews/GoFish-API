const router = require('express').Router();
const { updateVolunteers, getVolunteers, saveVolunteers } = require('./controllers/visit');
const {
  getExportData,
  getAllSurveys,
  getSurveysByVolunteersID,
  saveSurvey,
} = require('./controllers/survey');
const { savePhoto, getPhotos, getAllPhotos, getPhotosByCategory } = require('./controllers/photo');
const { newUser, getUser, updateUser, getAllUsers } = require('./controllers/users');
const { getAllOrgs, addUserToOrg, newOrg } = require('./controllers/organization');
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

router.post('/user', newUser);
router.get('/user/:uid', getUser);
router.get('/user', getAllUsers)
router.put('/user', updateUser);

// get users assigned to that org
router.get('/orgusers')


router.get('/organization', getAllOrgs);
router.put('/organization', addUserToOrg);
router.post('/organization', newOrg);

module.exports = router;
