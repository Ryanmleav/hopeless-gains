SELECT c.color_id, c.product_color,  pic.picture_id, pic.img
FROM product_color c
JOIN product_pictures pic ON c.color_id = pic.color_id
WHERE c.product_id = $1;

-- make a get product color query. trimed down columns