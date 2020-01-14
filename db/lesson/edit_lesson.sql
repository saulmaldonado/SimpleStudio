UPDATE lessons
SET lesson_type = $1,
lesson_time = $2,
lesson_length = $3,
lesson_notes = $4
WHERE lesson_id = $5
RETURNING *