SELECT * FROM student_notifications
WHERE student_id = $1
ORDER BY notification_id DESC