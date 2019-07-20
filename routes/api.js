const express = require('express');
const pool = require('../database/config');

const router = express.Router();
router.post('/register', (request, response, next) => {
    const studentList = request.body.students;
    const queryString1 = 'SELECT * FROM teachers WHERE email = ?';
    const queryString2 = 'SELECT * FROM students WHERE email = ? AND id_teacher = ?';
    const queryString3 = 'INSERT INTO students (email, id_teacher) VALUES (? , ?)';

    pool.query(queryString1, request.body.teacher, (error, result) => {

        if (error) {
            console.log("Failed to query for teacher: " + error);
            response.sendStatus(500);
            return;
        }

        if (result.length === 1) {
            const teacherId = result[0].id;
            studentList.forEach(value => {
                pool.query(queryString2, [value, teacherId], (error, result) => {
                    if (error) {
                        console.log("Failed to query for students: " + error);
                        response.sendStatus(500);
                        return;
                    }

                    if (result.length === 0) {
                        pool.query(queryString3, [value, teacherId], (error, result) => {
                            if (error) {
                                console.log("Failed to insert new student: " + error);
                                next(error);
                            }
                            console.log("Inserted a new student with id: ", result.insertId);
                        });
                    }
                });
            });
            response.status(204).send();
        } else {
            response.status(400).send({
                message: 'There is no such teacher exist'
            });
        }
    });
});


router.get('/commonstudents', (request, response) => {

    const teacherList = request.query.teacher;

    let queryString = 'SELECT DISTINCT s.email ' +
        'FROM students AS s ' +
        'INNER JOIN teachers AS t ' +
        'ON s.id_teacher = t.id ' +
        'WHERE t.email IN (?) ';

    if (typeof teacherList === "object") {
        queryString += 'GROUP BY s.email ' +
            'HAVING COUNT(*) >= 2';
    }
    pool.query(queryString, [teacherList], (error, result) => {
        if (error) {
            console.log("Failed to query for students: " + error);
            response.sendStatus(500);
            return;
        }

        if (result.length >= 1) {
            const resultArray = [];
            result.forEach(value => {
                resultArray.push(value.email);
            })
            response.status(200).send({
                students: resultArray
            });

        } else {
            response.status(400).send({
                message: 'There is no student in common with the list of teachers'
            });
        }
    })
});

router.post('/suspend', (request, response) => {
    const queryString = 'UPDATE students SET is_suspend = 1 WHERE email = ?';
    pool.query(queryString, request.body.student, (error, result) => {
        if (error) {
            console.log("Failed to query for update student: " + error);
            response.sendStatus(500);
            return;
        }

        if (result.affectedRows >= 1) {
            response.status(204).send();
        } else {
            response.status(400).send({
                message: 'There is no such student to suspend'
            });
        }
    });
});

router.post('/retrievefornotifications', (request, response) => {
    const resultArray = [];
    let studentList = [''];
    const teacher = request.body.teacher;
    const notification = request.body.notification;

    if (notification.includes("@")) {
        studentList = (notification.split(" ")
            .map(value => {
                if (value.charAt(0) === '@') return value.substr(1).trim();
            })
            .filter(value => {
                return value != null;
            }));
    }

    const queryString = 'SELECT DISTINCT s.email ' +
        'FROM students AS s ' +
        'INNER JOIN teachers AS t ' +
        'ON s.id_teacher = t.id ' +
        'WHERE (t.email = ? AND s.is_suspend = 0) OR (s.email IN (?) AND s.is_suspend = 0)';

    pool.query(queryString, [teacher, studentList], (error, result) => {
        if (error) {
            console.log("Failed to query for students: " + error);
            response.sendStatus(500);
            return;
        }

        if (result.length >= 1) {
            result.forEach(value => {
                resultArray.push(value.email);
            })
            response.status(200).send({
                recipients: resultArray
            });
        } else {
            response.status(400).send({
                message: 'There is no recipient'
            });
        }
    });
});

// Export the router
module.exports = router;