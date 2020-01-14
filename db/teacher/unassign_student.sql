UPDATE students
SET teacher_id = NULL
WHERE student_id = $1
RETURNING *