const ProjectController = require('../controllers/projectControllers');
const router = require('express').Router({ mergeParams: true });
const userStoryRouter = require('./userStoryRoutes');

router.use('/:projectId/us', userStoryRouter);

router.route('/').post(ProjectController.createProject);
router
    .route('/:projectId')
    .get(ProjectController.getProject)
    .delete(ProjectController.deleteProject);

module.exports = router;
