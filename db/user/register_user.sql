INSERT INTO users
(first_name, last_name, email, password, phone_number)
VALUES
($1, $2, $3, $4, $5)
RETURNING *;

