SELECT p.* FROM payments p
INNER JOIN lessons l ON p.lesson_id = l.lesson_id
WHERE l.student_id = $1 AND p.payment_ispaid = false