SELECT a.*, s.student_first_name, s.student_last_name FROM assignments a
INNER JOIN students s ON a.student_id = s.student_id
WHERE assignment_id = $1