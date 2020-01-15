INSERT INTO payments (lesson_id, payment_amount, payment_duedate, payment_ispaid, payment_date)
VALUES($1, $2, $3, false, $4)
RETURNING *