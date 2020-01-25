INSERT INTO teacher_notifications(notification_type, notification_title, notification_body, notification_time, teacher_id, student_id, lesson_id, lesson_time, lesson_length)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);

SELECT * FROM teacher_notifications
WHERE teacher_id = $5
ORDER BY notification_id DESC