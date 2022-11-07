const router = require('express').Router({ mergeParams: true });
const userStoryControllers = require('../controllers/userStoryController');

router.route('/').post(userStoryControllers.createUs);
router
    .route('/:usId')
    .get(userStoryControllers.getUs)
    .patch(userStoryControllers.modifyUs)
    .delete(userStoryControllers.deleteUs);

module.exports = router;
