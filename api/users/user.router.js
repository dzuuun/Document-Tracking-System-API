const { createUser, getUserByUserId, getUsers, updateUser, deleteUser, login, assignApprovingBody, updateUserPassword, getApprovingBody } = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation')

router.post('/register', createUser);
router.get('/:id', getUserByUserId);
router.get('/', getUsers);
router.patch('/update', updateUser);
router.delete('/delete', deleteUser);
router.post('/login', login);
router.post('/approvingbody/assign', assignApprovingBody);
router.patch('/update/password', updateUserPassword);
router.get('/approvingbody/all', getApprovingBody);

module.exports = router;