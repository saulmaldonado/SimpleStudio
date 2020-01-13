SELECT student_first_name, student_last_name, student_email, student_phone, student_id
FROM students
WHERE teacher_id = $1