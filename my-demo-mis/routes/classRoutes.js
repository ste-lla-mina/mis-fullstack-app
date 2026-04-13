const express = require('express');
const router = express.Router();
const { createClass, getTeacherStudents } = require('../controllers/classController');
const { protect, authorize } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/v1/classes/create:
 *   post:
 *     summary: Create a new class and assign students (Admin only)
 *     tags:
 *       - Classes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               className:
 *                 type: string
 *                 example: "Computer Science 101"
 *               subject:
 *                 type: string
 *                 example: "Web Development"
 *               teacherId:
 *                 type: string
 *                 description: "The MongoDB ID of the teacher"
 *               studentIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Array of Student IDs"
 *     responses:
 *       '201':
 *         description: Class created successfully
 *       '403':
 *         description: Unauthorized - Admin role required
 */

/**
 * @swagger
 * /api/v1/classes/my-students:
 *   get:
 *     summary: Get all students assigned to the logged-in teacher
 *     tags:
 *       - Classes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of classes and populated student data
 *       '401':
 *         description: Token missing or invalid
 */
router.post('/create', protect, authorize('admin'), createClass);
router.get('/my-students', protect, authorize('teacher'), getTeacherStudents);

module.exports = router;