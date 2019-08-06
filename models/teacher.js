'use strict';

const sql = require('../database/config');

const Teacher = (teacher => {
    this.email = teacher.email;
})

Teacher.getTeacherByEmail = ((teacherEmail, result) => {
    sql.query("SELECT * FROM teachers WHERE email = ?", [teacherEmail], ((error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res);
        }
    }));
});

Teacher.remove = ((teacherEmail, result) => {
    sql.query("DELETE FROM teachers WHERE email = ?", [teacherEmail], ((error, res) => {
        if (error) {
            result(error, null);
        } else {
            result(null, res);
        }
    }));
});

module.exports = Teacher;
