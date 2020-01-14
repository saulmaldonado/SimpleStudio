INSERT INTO logs (student_id, log_date, log_time, log_material)
VALUES($1, $2, $3, $4)
RETURNING *