const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const { getDashboard } = require("../controllers/dashboard.controller");

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard statistics APIs
 */

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/dashboard", getDashboard);

module.exports = router;