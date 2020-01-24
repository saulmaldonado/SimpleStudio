SELECT * FROM teacher_notifications
WHERE teacher_id = $1
ORDER BY notification_id DESC