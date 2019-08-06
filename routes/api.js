const express = require('express');
const StudentController = require('../controllers/student');


const router = express.Router();
router.post('/register', StudentController.add_student);
router.get('/commonstudents', StudentController.retrieve_common_student);
router.post('/suspend', StudentController.suspend_student);
router.post('/retrievefornotifications', StudentController.retrieve_notifications);

// Export the router
module.exports = router;