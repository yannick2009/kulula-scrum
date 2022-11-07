const ProjectController = require('../controllers/projectControllers');
const router = require('express').Router({ mergeParams: true });

router.route('/').post(ProjectController.createProject);

module.exports = router;
