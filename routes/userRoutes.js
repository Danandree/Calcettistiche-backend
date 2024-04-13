const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const matchController = require('../controllers/matchController');
const { checkJwtUser, checkJwtCookie } = require('../middleware/authMiddleware');

router.get('/', userController.getUserList);
router.get('/:id', userController.getUserPublic);
router.delete('/:id', checkJwtCookie, checkJwtUser, userController.deleteUser);
router.put('/:id', checkJwtCookie, checkJwtUser, userController.modifyUser);
router.patch('/:id', checkJwtCookie, checkJwtUser, userController.modifyUser);
router.get('/:id/referee', checkJwtCookie, checkJwtUser, matchController.getRefereeList);
router.get('/:id/private', checkJwtCookie, checkJwtUser, userController.getUser);
router.get('/:id/stats', userController.getUserStats);

module.exports = router;