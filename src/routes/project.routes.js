const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');

const{createProject,getProjects,getProject,updateProject,deleteProject} = require('../controllers/project.controller');

router.use(protect);

router.post('/workspaces/:workspaceId/projects',createProject);
router.get('/workspaces/:workspaceId/projects',getProjects);
router.get('/projects/:projectId',getProject);
router.patch('/projects/:projectId',updateProject);
router.delete('/projects/:projectId',deleteProject);

module.exports=router;