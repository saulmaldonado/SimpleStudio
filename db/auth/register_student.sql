INSERT INTO students (student_first_name, student_last_name, student_email, student_hash, student_phone)
VALUES ($1, $2, $3, $4, $5)
RETURNING *
