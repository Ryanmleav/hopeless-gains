INSERT INTO cart
(user_id, color_id, quantity)
VALUES
($1, $2, $3)
RETURNING *;