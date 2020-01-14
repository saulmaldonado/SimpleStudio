INSERT INTO payments (lesson_id, payment_amount, payment_duedate, payment_ispaid)
VALUES($1, $2, $3, false)
RETURNING *