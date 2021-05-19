# GoFish-API
## Summary
This is a REST API to drive our main application, GoFish, an application to increase the accuracy and ease of data collection for the fieldworkers of Skagit Fishieries Enhancement Group.

This API has been deployed over Heroku, so the first request every 30 minutes takes additional time.
## Endpoints:

### Getting data
- https://gofish-api.herokuapp.com/getExportData
(GET) Prepares a response from individual survey entries in the format of the Washington State database
- https://gofish-api.herokuapp.com/getAllSurveys

(GET) Sends all the individual survey entries
- https://gofish-api.herokuapp.com/getAllVolunteers

(GET) Sends a list of all the volunteer conditions, including who was present as well as the envionmental conditions
- https://gofish-api.herokuapp.com/getSurveys

(POST) Returns the list of surveys a particular volunteer group entered on one surveying period. Requires group_id
- https://gofish-api.herokuapp.com/getPhotos

(GET) Get all photos uploaded to our database. Includes reason_for_submission and optional comments
- https://gofish-api.herokuapp.com/getPhotos:category

(GET) Get all photos where category is the photo's reason_for_submission. Can be one of 'help identifying', 'outreach', or 'other'

### Adding data
- https://gofish-api.herokuapp.com/saveVolunteers

(POST) Initilize a new group of volunteers with a creek name, a team leader, and an array of all non-leader volunteers present. This returns a group_id needed for other requests
(PUT) Update the contents of this table with additional information, such as distance walked, water condition, view condition, flow type, visibility, and any comments concerning the entire day of surveying. Requires a group_id
- https://gofish-api.herokuapp.com/saveSurvey

(POST) Save an individual survey with GPS coordinates, fish species, fish status (alive, carcass, or redd), fish count. Requires a group_id
- https://gofish-api.herokuapp.com/savePhoto

(POST) Update a survey to include an image, which the client app uploaded to firebase. Requires a group_id
