UPDATE cart
SET quantity = $3
WHERE user_id = $1 
AND color_id = $2;

SELECT * FROM cart ORDER BY user_id;