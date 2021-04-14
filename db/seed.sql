CREATE TABLE users (
user_id SERIAL PRIMARY KEY,
first_name VARCHAR(100),
last_name VARCHAR(100),
email VARCHAR(100),
password VARCHAR(100),
phone_number BIGINT
);

CREATE TABLE products (
product_id SERIAL PRIMARY KEY,
product_name VARCHAR(100),
product_price INTEGER,
);
INSERT INTO products
(product_name, product_price)
VALUES
($1, $2);

-- ALTER TABLE products
-- ADD img varchar(2000)

-- UPDATE products
-- SET img =''
-- WHERE product_id = 1

CREATE TABLE cart (
cart_id SERIAL PRIMARY KEY,
user_id INT,
product_id INT,
FOREIGN KEY(user_id) REFERENCES users(user_id),
FOREIGN KEY(product_id) REFERENCES products(product_id),
quantity INTEGER
);

CREATE TABLE product_pictures (
  picture_id SERIAL PRIMARY KEY,
  img VARCHAR(255),
  color_id INT REFERENCES product_color(color_id)
)

CREATE TABLE product_color (
  color_id SERIAL PRIMARY KEY,
  product_color VARCHAR (200),
  product_id INT REFERENCES products(product_id)
)
INSERT INTO product_color(product_color, product_id)
VALUES
($1, $2)

CREATE TABLE product_size (
  size_id SERIAL PRIMARY KEY,
  product_size VARCHAR(200),
  product_id INT REFERENCES products(product_id)
  )
