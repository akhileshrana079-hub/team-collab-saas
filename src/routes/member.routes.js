const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {
  addMember,
  getMembers,
  updateMemberRole,
  removeMember,
} = require("../controllers/member.controller");

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Workspace member management APIs
 */

/**
 * @swagger
 * /workspaces/{id}/members:
 *   post:
 *     summary: Add a member to a workspace
 *     tags: [Members]
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
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               role:
 *                 type: string
 *                 enum: [ADMIN, MANAGER, MEMBER]
 *                 example: MEMBER
 *     responses:
 *       201:
 *         description: Member added successfully
 *       400:
 *         description: Invalid request
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Workspace or user not found
 */
router.post("/workspaces/:id/members", addMember);

/**
 * @swagger
 * /workspaces/{id}/members:
 *   get:
 *     summary: Get all members of a workspace
 *     tags: [Members]
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
 *         description: Members fetched successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Workspace not found
 */
router.get("/workspaces/:id/members", getMembers);

/**
 * @swagger
 * /members/{memberId}/role:
 *   patch:
 *     summary: Update a member's role
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *         description: Workspace Member ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [ADMIN, MANAGER, MEMBER]
 *                 example: ADMIN
 *     responses:
 *       200:
 *         description: Member role updated successfully
 *       400:
 *         description: Invalid role
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Member not found
 */
router.patch("/members/:memberId/role", updateMemberRole);

/**
 * @swagger
 * /members/{memberId}:
 *   delete:
 *     summary: Remove a member from a workspace
 *     tags: [Members]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *         description: Workspace Member ID
 *     responses:
 *       200:
 *         description: Member removed successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Member not found
 */
router.delete("/members/:memberId", removeMember);

module.exports = router;