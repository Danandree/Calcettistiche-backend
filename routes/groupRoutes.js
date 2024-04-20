const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const { checkJwtCookie } = require('../middleware/authMiddleware');
const { isUserGroupAdmin } = require('../middleware/groupsMiddleware');

router.get('/', groupController.getGroupList);
router.post('/', checkJwtCookie, groupController.createGroup);
router.get('/:id', isUserGroupAdmin, groupController.getGroupById);
router.put('/:id', isUserGroupAdmin, checkJwtCookie, groupController.updateGroup);
router.patch('/:id', isUserGroupAdmin, checkJwtCookie, groupController.updateGroup);
router.delete('/:id', isUserGroupAdmin, checkJwtCookie, groupController.deleteGroup);


module.exports = router;