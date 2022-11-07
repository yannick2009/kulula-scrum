const router = require('express').Router();
const userControllers = require('../controllers/userControllers');
const projectRouter = require('../routes/projectRoutes');

router.use('/:userId/projects', projectRouter);

router
    .route('/')
    .post(userControllers.signup)
    .get(userControllers.allUsers);
router
    .route('/:id')
    .get(userControllers.oneUser)
    .delete(userControllers.deleteUser);

module.exports = router;
