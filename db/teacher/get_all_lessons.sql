SELECT l.* FROM lessons l 
INNER JOIN students s ON s.student_id = l.student_id 
WHERE s.teacher_id = $1