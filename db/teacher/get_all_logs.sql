SELECT lo.* FROM logs lo 
INNER JOIN students s ON s.student_id = lo.student_id 
WHERE s.teacher_id = $1