UPDATE payments
SET payment_amount = $1,
payment_duedate = $2,
payment_ispaid = $3
WHERE payment_id = $4