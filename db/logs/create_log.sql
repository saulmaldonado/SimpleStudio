INSERT INTO logs (student_id, log_date, log_time, log_material)
VALUES($1, TIMEOFDAY(), $3, $4)