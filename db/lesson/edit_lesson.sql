UPDATE lessons
SET lesson_type = $1,
lesson_type = $2,
lesson_time = $3,
lesson_length = $4,
lesson_notes = $5
WHERE lesson_id = $6