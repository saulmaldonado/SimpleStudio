DELETE FROM teacher_notifications
WHERE notification_id = $1;

SELECT * FROM teacher_notifications