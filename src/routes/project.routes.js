const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management APIs
 */

/**
 * @swagger
 * /workspaces/{workspaceId}/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workspaceId
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
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Team Collaboration SaaS
 *               description:
 *                 type: string
 *                 example: Backend Development
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Workspace not found
 */
router.post("/workspaces/:workspaceId/projects", createProject);

/**
 * @swagger
 * /workspaces/{workspaceId}/projects:
 *   get:
 *     summary: Get all projects in a workspace
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: workspaceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Workspace ID
 *     responses:
 *       200:
 *         description: Projects fetched successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Workspace not found
 */
router.get("/workspaces/:workspaceId/projects", getProjects);

/**
 * @swagger
 * /projects/{projectId}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project fetched successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Project not found
 */
router.get("/projects/:projectId", getProject);

/**
 * @swagger
 * /projects/{projectId}:
 *   patch:
 *     summary: Update a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Project
 *               description:
 *                 type: string
 *                 example: Updated Description
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, ARCHIVED]
 *                 example: ACTIVE
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Project not found
 */
router.patch("/projects/:projectId", updateProject);

/**
 * @swagger
 * /projects/{projectId}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Project not found
 */
router.delete("/projects/:projectId", deleteProject);

module.exports = router;