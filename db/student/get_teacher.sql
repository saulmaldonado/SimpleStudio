SELECT t.* FROM teachers t
INNER JOIN students s ON s.teacher_id = t.teacher_id
WHERE s.student_id = $1