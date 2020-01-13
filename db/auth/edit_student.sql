UPDATE students
SET student_first_name = $1,
student_last_name = $2,
student_email = $3,
student_hash = $4,
student_phone = $5
WHERE student_id = $6