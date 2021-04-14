SELECT p.product_id, p.product_name, p.product_price, c.color_id, c.product_color, s.size_id, s.product_size, pic.picture_id, pic.img
FROM products p
JOIN product_color c ON p.product_id = c.product_id
JOIN product_size s ON p.product_id = s.product_id
JOIN product_pictures pic ON c.color_id = pic.color_id
WHERE product_id = $1

-- GET ONE PRODUCT IS ABOVE SELECT ALL PRODUCTS WHERE ID = $1
-- make a get product color query. trimed down columns