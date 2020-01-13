SELECT p.* FROM payments p
INNER JOIN lessons l ON p.lesson_id = l.lesson_id
INNER JOIN students s ON s.student_id = l.student_id
WHERE s.teacher_id = $1