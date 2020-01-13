UPDATE logs
SET log_date = $1,
log_time = $2,
log_material = $3
WHERE log_id = $4