const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const { checkJwtCookie } = require('../middleware/authMiddleware')
const {isUserMatchAdmin} = require('../middleware/matchesMiddleware');

router.get('/', matchController.getMatchesList);
router.post('/', checkJwtCookie, matchController.createMatch);
router.get('/:id', matchController.getMatchById);
router.put('/:id', checkJwtCookie, isUserMatchAdmin, matchController.updateMatch);
router.patch('/:id', checkJwtCookie, isUserMatchAdmin, matchController.updateMatch);
router.get('/:id/players', matchController.getUserListByMatchId);

module.exports = router