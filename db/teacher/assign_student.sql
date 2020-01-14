UPDATE students
SET teacher_id = $1
WHERE student_id = $2
RETURNING *