SELECT c.*, p.*, pic.img
FROM cart c
JOIN product_color p
ON p.color_id = c.color_id
JOIN product_pictures pic ON p.color_id = pic.color_id
JOIN users u
ON c.user_id = u.user_id
WHERE u.user_id = $1;

