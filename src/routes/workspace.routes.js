const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');

const{createWorkspace,getMyWorkspace,getWorkspace,updateWorkspace,deleteWorkspace}= require('../controllers/workspace.controller')

router.use(protect);
router.post('/',createWorkspace);
router.get('/',getMyWorkspace);
router.get('/:id',getWorkspace)
router.patch('/:id',updateWorkspace);
router.delete('/:id',deleteWorkspace);

module.exports= router;
