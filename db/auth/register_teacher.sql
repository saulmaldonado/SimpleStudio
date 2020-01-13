INSERT INTO teachers (teacher_first_name, teacher_last_name, teacher_email, teacher_hash, teacher_phone)
VALUES ($1, $2, $3, $4, $5 )
RETURNING *