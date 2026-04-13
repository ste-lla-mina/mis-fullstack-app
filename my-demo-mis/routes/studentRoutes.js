const express = require('express');
const router = express.Router();
const { 
  createStudent, getStudents, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentController'); 
const { protect, authorize } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/v1/students/all:
 *   get:
 *     summary: Returns the list of all students
 *     tags:
 *       - Students
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: The list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 */


router.get('/all', protect, getStudents);
router.get('/:id', protect, getStudentById);
router.post('/add', protect, authorize('admin', 'teacher'), createStudent);
router.put('/:id', protect, authorize('admin', 'teacher'), updateStudent);
router.delete('/:id', protect, authorize('admin'), deleteStudent); 

module.exports = router;