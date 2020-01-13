UPDATE students
SET teacher_id = $1
WHERE student_id = $2;
SELECT * FROM students
WHERE student_id = $2