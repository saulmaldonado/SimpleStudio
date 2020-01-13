UPDATE students
SET student_first_name = $1,
student_last_name = $2,
student_email = $3,
student_phone = $4
WHERE student_id = $5
RETURNING *