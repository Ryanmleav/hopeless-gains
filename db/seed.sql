CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
first_name VARCHAR(100),
last_name VARCHAR(100),
email VARCHAR(100),
password VARCHAR(100),
phone_number INTEGER
);

CREATE TABLE products (
product_id SERIAL PRIMARY KEY,
product_name VARCHAR(100),
product_price INTEGER,
product_color VARCHAR(100),
product_size VARCHAR(100)
);
INSERT INTO products
(product_name, product_price, product_color, product_size)
VALUES
($1, $2, $3, $4);

ALTER TABLE products
ADD img varchar(2000)

UPDATE products
SET img =''
WHERE product_id = 1

CREATE TABLE cart (
cart_id SERIAL PRIMARY KEY,
user_id INT,
product_id INT,
FOREIGN KEY(user_id) REFERENCES users(user_id),
FOREIGN KEY(product_id) REFERENCES products(product_id),
quantity INTEGER
);