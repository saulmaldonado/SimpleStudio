UPDATE teachers
SET teacher_first_name = $1,
teacher_last_name = $2,
teacher_email = $3,
teacher_hash = $4,
teacher_phone = $5
WHERE teacher_id = $6
