SELECT a.* FROM assignments a
INNER JOIN students s ON s.student_id = a.student_id
WHERE s.teacher_id = $1