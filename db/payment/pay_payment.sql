UPDATE payments
SET payment_ispaid = true
WHERE payment_id = $1;
SELECT * FROM payments