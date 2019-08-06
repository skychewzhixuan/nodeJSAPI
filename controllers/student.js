'use strict';

const Student = require('../models/student');
const Teacher = require('../models/teacher');

exports.add_student = (req, res, next) => {
    const studentList = req.body.students;

    Teacher.getTeacherByEmail(req.body.teacher, (error, teacher) => {
        if (error) {
            console.log("Failed to query for teacher: " + error);
            res.sendStatus(500);
            return;
        }

        if (teacher.length === 1) {
            studentList.forEach(value => {
                Student.getStudentByEmailAndTeacherID(value, teacher[0].id, (error, student) => {
                    if (error) {
                        console.log("Failed to query for students: " + error);
                        res.sendStatus(500);
                        return;
                    }
                    if (student.length === 0) {
                        const newStudent = new Student({
                            email: value,
                            is_suspend: '0',
                            id_teacher: teacher[0].id
                        });

                        Student.createStudent(newStudent, (error, res) => {
                            if (error) {
                                console.log("Failed to insert new student: " + error);
                                next(error);
                            }
                            console.log("Inserted a new student with id: ", res);
                        })
                    }
                })
            });
            res.status(204).send();
        } else {
            res.status(400).send({
                message: 'There is no such teacher exist'
            });
        }
    });
};

exports.retrieve_common_student = (req, res) => {
    const teacherList = req.query.teacher;

    Student.getCommonStudentList(teacherList, (error, result) => {
        if (error) {
            console.log("Failed to query for students: " + error);
            res.sendStatus(500);
            return;
        } else {
            if (result.length >= 1) {
                const resultArray = [];
                result.forEach(value => {
                    resultArray.push(value.email);
                })
                res.status(200).send({
                    students: resultArray
                });

            } else {
                res.status(400).send({
                    message: 'There is no student in common with the list of teachers'
                });
            }
        }
    });
};

exports.suspend_student = (req, res) => {
    Student.suspendStudent(req.body.student, (error, result) => {
        if (error) {
            console.log("Failed to query for update student: " + error);
            res.sendStatus(500);
            return;
        }
        if (result >= 1) {
            res.status(204).send();
        } else {
            res.status(400).send({
                message: 'There is no such student to suspend'
            });
        }
    });
};

exports.retrieve_notifications = (req, res) => {

    const resultArray = [];
    let studentList = [''];
    const teacher = req.body.teacher;
    const notification = req.body.notification;

    if (notification.includes("@")) {
        studentList = (notification.split(" ")
            .map(value => {
                if (value.charAt(0) === '@') return value.substr(1).trim();
            })
            .filter(value => {
                return value != null;
            }));
    }

    Student.getNotifications(teacher, studentList, (error, result) => {
        if (error) {
            console.log("Failed to query for students: " + error);
            res.sendStatus(500);
            return;
        }

        if (result.length >= 1) {
            result.forEach(value => {
                resultArray.push(value.email);
            })
            res.status(200).send({
                recipients: resultArray
            });
        } else {
            res.status(400).send({
                message: 'There is no recipient'
            });
        }
    });
};
