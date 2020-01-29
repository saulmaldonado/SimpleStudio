SELECT * FROM assignments
WHERE student_id = $1
ORDER BY assignment_id DESC
