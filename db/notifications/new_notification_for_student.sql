INSERT INTO student_notifications(notification_type, notification_title, notification_body, notification_time, teacher_id, student_id)
VALUES($1, $2, $3, $4, $5, $6);

SELECT * FROM student_notifications
WHERE student_id = $6

