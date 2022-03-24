const { addDocument, getDocById, getDoc, updateDoc, deleteDoc } = require('./doc.controller');
const router = require('express').Router();
const { checkToken  } = require('../../auth/token_validation');


/*
router.post('/', checkToken, createUser);
router.get('/:id',checkToken, getUserByUserId);
router.get('/',checkToken, getUsers);
router.patch('/update/',checkToken, updateUser);
router.delete('/delete/',checkToken, deleteUser);
router.post('/login', login);
*/
 router.post('/', checkToken, addDocument);
 router.get('/:id', checkToken, getDocById);
 router.get('/', checkToken, getDoc);
 router.patch('/update/',checkToken, updateDoc);
 router.delete('/delete/',checkToken, deleteDoc);

module.exports = router;