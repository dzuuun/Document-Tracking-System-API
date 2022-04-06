const { addDocument, getDocInfoById, getAllDoc, updateDoc, deleteDoc, getDocByUserId, getDocTrailById, updateDocStatus, searchDocByUserId, searchAllDoc, getAllDocByOffice, updateActionTaken, addTrailLog } = require('./doc.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');


/*
router.post('/', checkToken, createUser);
router.get('/:id',checkToken, getUserByUserId);
router.get('/',checkToken, getUsers);
router.patch('/update/',checkToken, updateUser);
router.delete('/delete/',checkToken, deleteUser);
router.post('/login', login);
*/
router.post('/add', addDocument);
router.get('/:id', getDocInfoById);
router.get('/', getAllDoc);
router.patch('/update', updateDoc);
router.delete('/delete/', deleteDoc);
router.get('/user/:id', getDocByUserId);
router.get('/trail/:id', getDocTrailById);
router.patch('/update/status', updateDocStatus);
router.get('/search/foruser', searchDocByUserId);
router.get('/search/all', searchAllDoc);
router.get('/office/all', getAllDocByOffice);
router.patch('/update/action', updateActionTaken);
router.post('/trail/add/log', addTrailLog);

module.exports = router;