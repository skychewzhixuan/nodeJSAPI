CREATE SCHEMA api_db;

USE api_db;

CREATE TABLE teachers (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX email_UNIQUE (email ASC));

CREATE TABLE students (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(45) NOT NULL,
  is_suspend TINYINT NOT NULL DEFAULT 0,
  id_teacher INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_teacher_id_idx (id_teacher ASC),
  CONSTRAINT fk_teacher_id
    FOREIGN KEY (id_teacher)
    REFERENCES teachers (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

INSERT INTO teachers (email) VALUES ('teacherken@gmail.com');
INSERT INTO teachers (email) VALUES ('teacherjoe@gmail.com');
INSERT INTO teachers (email) VALUES ('teacherken2@gmail.com');
INSERT INTO teachers (email) VALUES ('teacherjoe2@gmail.com');

INSERT INTO students (email, is_suspend, id_teacher) VALUES ('studentbob@gmail.com', '0', '1');
INSERT INTO students (email, is_suspend, id_teacher) VALUES ('studentagnes@gmail.com', '0', '2');
INSERT INTO students (email, is_suspend, id_teacher) VALUES ('studentmiche@gmail.com', '0', '2');

INSERT INTO students (email, is_suspend, id_teacher) VALUES ('studentmary@gmail.com', '0', '2');

INSERT INTO students (email, is_suspend, id_teacher) VALUES ('commonstudent1@gmail.com', '0', '3');
INSERT INTO students (email, is_suspend, id_teacher) VALUES ('commonstudent2@gmail.com', '0', '3');
INSERT INTO students (email, is_suspend, id_teacher) VALUES ('student_only_under_teacher_ken@gmail.com', '0', '3');

INSERT INTO students (email, is_suspend, id_teacher) VALUES ('commonstudent1@gmail.com', '0', '4');
INSERT INTO students (email, is_suspend, id_teacher) VALUES ('commonstudent2@gmail.com', '0', '4');


CREATE SCHEMA api_test_db;
USE api_test_db;

CREATE TABLE teachers (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX email_UNIQUE (email ASC));

CREATE TABLE students (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(45) NOT NULL,
  is_suspend TINYINT NOT NULL DEFAULT 0,
  id_teacher INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_teacher_id_idx (id_teacher ASC),
  CONSTRAINT fk_teacher_id
    FOREIGN KEY (id_teacher)
    REFERENCES teachers (id)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

INSERT INTO teachers (email) VALUES ('teachersky@gmail.com');
INSERT INTO teachers (email) VALUES ('teachergwen@gmail.com');
INSERT INTO teachers (email) VALUES ('teachertony@gmail.com');

INSERT INTO students (email, is_suspend, id_teacher) VALUES ('student1@gmail.com', '0', '1');
INSERT INTO students (email, is_suspend, id_teacher) VALUES ('student2@gmail.com', '0', '1');
INSERT INTO students (email, is_suspend, id_teacher) VALUES ('common_student3@gmail.com', '0', '1');
INSERT INTO students (email, is_suspend, id_teacher) VALUES ('common_student4@gmail.com', '0', '1');

INSERT INTO students (email, is_suspend, id_teacher) VALUES ('student4@gmail.com', '0', '2');
INSERT INTO students (email, is_suspend, id_teacher) VALUES ('student5@gmail.com', '0', '2');
INSERT INTO students (email, is_suspend, id_teacher) VALUES ('common_student3@gmail.com', '0', '2');
INSERT INTO students (email, is_suspend, id_teacher) VALUES ('common_student4@gmail.com', '0', '2');

INSERT INTO students (email, is_suspend, id_teacher) VALUES ('other_student1@gmail.com', '0', '3');