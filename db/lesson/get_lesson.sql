SELECT l.*, s.student_first_name, s.student_last_name FROM lessons l
INNER JOIN students s ON l.student_id = s.student_id
WHERE lesson_id = $1