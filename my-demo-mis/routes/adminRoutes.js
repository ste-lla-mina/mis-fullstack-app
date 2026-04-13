const express = require('express');
const router = express.Router();
const { getAllUsers, updateUserRole } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/v1/admin/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/users', protect, authorize('admin'), getAllUsers);

/**
 * @swagger
 * /api/v1/admin/users/{id}/role:
 *   patch:
 *     summary: Update a user's role (admin only)
 *     tags:
 *       - Admin
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User role updated successfully
 */
router.patch('/users/:id/role', protect, authorize('admin'), updateUserRole);

module.exports = router;
