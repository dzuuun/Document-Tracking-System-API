const { addDocument, getDocInfoById, getAllDoc, updateDoc, deleteDoc, getDocByUserId, getDocTrailById, updateDocStatus } = require('./doc.controller');
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
 router.post('/',  addDocument);
 router.get('/all/:id',  getDocInfoById);
 router.get('/', getAllDoc);
 router.patch('/update/', updateDoc);
 router.delete('/delete/', deleteDoc);
 router.get('/user/:id', getDocByUserId);
 router.get('/trail/:id', getDocTrailById);
 router.patch('/update/status', updateDocStatus);

module.exports = router;