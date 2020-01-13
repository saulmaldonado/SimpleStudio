--- Create Tables

CREATE TABLE teachers (
	teacher_id SERIAL PRIMARY KEY,
	teacher_first_name VARCHAR (50) NOT NULL,
	teacher_last_name VARCHAR (50) NOT NULL,
	teacher_email VARCHAR (50) NOT NULL,
	teacher_hash TEXT NOT NULL,
	teacher_phone VARCHAR (10)
);



CREATE TABLE students (
	student_id SERIAL PRIMARY KEY,
	student_first_name VARCHAR (50) NOT NULL,
	student_last_name VARCHAR (50) NOT NULL,
	student_email VARCHAR (50) NOT NULL,
	student_hash TEXT NOT NULL,
	student_phone VARCHAR (10)
	teacher_id INT REFERENCES teachers(teacher_id)
);



CREATE TABLE lessons (
	lesson_id SERIAL PRIMARY KEY,
	lesson_type VARCHAR (50) NOT NULL,
	lesson_time VARCHAR (20) NOT NULL,
	lesson_length INTEGER NOT NULL,
	lesson_notes VARCHAR (500),
	student_id INT REFERENCES students(student_id)
);



CREATE TABLE assignments (
	assignment_id SERIAL PRIMARY KEY,
	assignment_title VARCHAR (200) NOT NULL,
	assignment_composer VARCHAR (200),
	assignment_source VARCHAR (200) NOT NULL,
	assignment_page VARCHAR (200) NOT NULL,
	assignment_requirements VARCHAR (200) NOT NULL,
	assignment_duedate VARCHAR (20) NOT NULL,
    assignment_completed BOOLEAN,
	student_id INT REFERENCES students(student_id)
);


CREATE TABLE payments (
	payment_id SERIAL PRIMARY KEY,
	payment_amount INTEGER NOT NULL,
	payment_duedate VARCHAR (20) NOT NULL,
	payment_ispaid BOOLEAN,
	lesson_id INT REFERENCES lessons(lesson_id)
);



CREATE TABLE logs (
	log_id SERIAL PRIMARY KEY,
	log_date VARCHAR (255) NOT NULL,
	log_time INTEGER NOT NULL,
	log_material VARCHAR (500) NOT NULL,
	student_id INT REFERENCES students(student_id)
);


--- Authentication 

--- check_for_teacher_email.sql
SELECT * FROM teachers
WHERE teacher_email = $1

--- check_for_student_email.sql
SELECT * FROM students
WHERE student_email = $1

--- register_teacher.sql
INSERT INTO teachers (teacher_first_name, teacher_last_name, teacher_email, teacher_hash, teacher_phone)
VALUES ($1, $2, $3, $4, $5 )

--- register_student.sql
INSERT INTO students (student_first_name, student_last_name, student_email, student_hash, student_phone)
VALUES ($1, $2, $3, $4, $5)

-- edit_student.sql
UPDATE students
SET student_first_name = $1,
student_last_name = $2,
student_email = $3,
student_hash = $4,
student_phone = $5
WHERE student_id = $6

-- edit_teacher.sql
UPDATE teachers
SET teacher_first_name = $1,
teacher_last_name = $2,
teacher_email = $3,
teacher_hash = $4,
teacher_phone = $5
WHERE teacher_id = $6


-- delete_teacher.sql
DELETE FROM teachers
WHERE teacher_id = $1

-- delete_student.sql
DELETE FROM students
WHERE student_id = $1

--- Lessons

--- add_lesson.sql
INSERT INTO lessons (student_id, lesson_type, lesson_time, lesson_length, lesson_notes)
VALUES ($1, $2, $3, $4, $5)

-- edit_lesson.sql
UPDATE lessons
SET lesson_type = $1,
lesson_type = $2,
lesson_time = $3,
lesson_length = $4,
lesson_notes = $5
WHERE lesson_id = $6

--- Assignments

--- add_assignment.sql
INSERT INTO assignments (student_id, assignment_title, assignment_source, assignment_page, assignment_requirements, assignment_duedete, assignment_completed)
VALUES($1, $2, $3, $4, $5, $6, false)

-- edit_assingment.sql
UPDATE assignments
SET assignment_title = $1,
assignemt_source = $2,
assignment_page = $3,
assignment_page = $4,
assignment_requirements = $5,
assignment_due = $6, 
assignment_completed = $7
WHERE assingment_id = $8

--- Logs

--- add_logs.sql
INSERT INTO logs (student_id, log_date, log_time, log_material)
VALUES($1, TIMEOFDAY(), $3, $4)

-- edit_log.sql
UPDATE logs
SET log_date = $1,
log_time = $2,
log_material = $3
WHERE log_id = $4

--- Payments

-- add_payments.sql
INSERT INTO payments (lesson_id, payment_amount, payment_duedate, payment_ispaid)
VALUES($1, $2, $3, false)

-- edit_payment.sql
UPDATE payments
SET payment_amount = $1,
payment_duedate = $2,
payment_ispaid = $3
WHERE payment_id = $4

-- Teacher

-- get_all_students.sql
SELECT * FROM students
WHERE teacher_id = $1

--- Student

--- assign_student.sql
UPDATE students
SET teacher_id = $1
WHERE student_id = $2

--- unassign_studnet.sql
UPDATE students
SET teacher_id = NULL
WHERE student_id = $1

-- get_all_lessons.sql
SELECT * FROM lessons
WHERE student_id = $1

-- get_all_assignments.sql
SELECT * FROM assignments
WHERE student_id = $1

-- get_all_logs.sql
SELECT * FROM logs
WHERE student_id = $1

-- get_all_payments.sql
SELECT * FROM payments
WHERE student_id = $1


-- group_all_students_by_teacher.sql
SELECT student_first_name, student_last_name
FROM students
GROUP BY teacher_id

-- get_all_payments_for_student.sql
SELECT p.* FROM payments p
INNER JOIN lessons l ON p.lesson_id = l.lesson_id
WHERE l.student_id = $1

-- get_all_unpaid_payments_for_student.sql
SELECT p.* FROM payments p
INNER JOIN lessons l ON p.lesson_id = l.lesson_id
WHERE l.student_id = $1 AND p.payment_ispaid = false



