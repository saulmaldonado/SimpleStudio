SELECT p.*, s.student_first_name, s.student_last_name FROM payments p
INNER JOIN lessons l ON l.lesson_id = p.lesson_id
INNER JOIN students s ON l.student_id = s.student_id
WHERE p.payment_ispaid = true AND s.teacher_id = $1
