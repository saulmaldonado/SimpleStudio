UPDATE students
SET teacher_id = NULL
WHERE student_id = $1;
SELECT * FROM 
WHERE student_id = $1