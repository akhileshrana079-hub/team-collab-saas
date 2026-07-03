const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth.middleware');

const{createWorkspace,getMyWorkspace,getWorkspace,updateWorkspace,deleteWorkspace}= require('../controllers/workspace.controller')

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Workspaces
 *   description: Workspace management APIs
 */


/**
 * @swagger
 * /workspaces:
 *   post:
 *     summary: Create a new workspace
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Team Collaboration SaaS
 *               description:
 *                 type: string
 *                 example: Backend Development Workspace
 *     responses:
 *       201:
 *         description: Workspace created successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/',createWorkspace);

/**
 * @swagger
 * /workspaces:
 *   get:
 *     summary: Get all workspaces of the logged in user
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of workspaces
 *       401:
 *         description: Unauthorized
 */
router.get('/',getMyWorkspace);

/**
 * @swagger
 * /workspaces/{id}:
 *   get:
 *     summary: Get workspace by ID
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Workspace ID
 *     responses:
 *       200:
 *         description: Workspace fetched successfully
 *       404:
 *         description: Workspace not found
 */
router.get('/:id',getWorkspace)

/**
 * @swagger
 * /workspaces/{id}:
 *   patch:
 *     summary: Update workspace
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Workspace ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Workspace
 *               description:
 *                 type: string
 *                 example: Updated Description
 *     responses:
 *       200:
 *         description: Workspace updated successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Workspace not found
 */
router.patch('/:id',updateWorkspace);


/**
 * @swagger
 * /workspaces/{id}:
 *   delete:
 *     summary: Delete workspace
 *     tags: [Workspaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Workspace ID
 *     responses:
 *       200:
 *         description: Workspace deleted successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Workspace not found
 */
router.delete('/:id',deleteWorkspace);


module.exports= router;
