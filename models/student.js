'use strict';

const sql = require('../database/config');

const Student = function(student) {
    this.email = student.email;
    this.is_suspend = student.is_suspend;
    this.id_teacher = student.id_teacher;
};

Student.createStudent = (newStudent, result) => {
    const {email, id_teacher} = newStudent;
    sql.query("INSERT INTO students (email, id_teacher) VALUES (? , ?)", [email, id_teacher], ((error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res.insertId);
        }
    }))
};

Student.getStudentByEmailAndTeacherID = (studentEmail, teacherId, result) => {
    sql.query("SELECT * FROM students WHERE email = ? AND id_teacher = ?", [studentEmail, teacherId], (error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res);
        }
    });
};

Student.suspendStudent = (studentEmail, result) => {
    sql.query("UPDATE students SET is_suspend = 1 WHERE email = ?", [studentEmail], ((error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res.affectedRows);
        }
    }))
};

Student.getCommonStudentList = (teacherList, result) => {
    let queryString = 'SELECT DISTINCT s.email ' +
        'FROM students AS s ' +
        'INNER JOIN teachers AS t ' +
        'ON s.id_teacher = t.id ' +
        'WHERE t.email IN (?) ';

    if (typeof teacherList === "object") {
        queryString += 'GROUP BY s.email ' +
            'HAVING COUNT(*) >= 2';
    }
    sql.query(queryString, [teacherList], ((error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res);
        }
    }))
};

Student.getNotifications = (teacherEmail, studentList, result) => {
    const queryString = 'SELECT DISTINCT s.email ' +
        'FROM students AS s ' +
        'INNER JOIN teachers AS t ' +
        'ON s.id_teacher = t.id ' +
        'WHERE (t.email = ? AND s.is_suspend = 0) OR (s.email IN (?) AND s.is_suspend = 0)';

    sql.query(queryString, [teacherEmail, studentList], ((error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res);
        }
    }))
};


module.exports = Student;
