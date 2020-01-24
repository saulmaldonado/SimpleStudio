DELETE FROM student_notifications
WHERE notification_id = $1;

SELECT * FROM student_notifications
ORDER BY notification_id DESC
