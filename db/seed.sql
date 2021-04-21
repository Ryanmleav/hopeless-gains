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

INSERT INTO products
(product_name)
VALUES
($1);

CREATE TABLE cart (
cart_id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(user_id),
color_id INT REFERENCES product_color(color_id),
quantity INTEGER
);

CREATE TABLE product_pictures (
  picture_id SERIAL PRIMARY KEY,
  img VARCHAR(255),
  color_id INT REFERENCES product_color(color_id)
)
INSERT INTO product_pictures(img, color_id)
VALUES
($1, $2)

CREATE TABLE product_color (
  color_id SERIAL PRIMARY KEY,
  product_color VARCHAR (200),
  product_price INTEGER,
  product_id INT REFERENCES products(product_id)
)
INSERT INTO product_color(product_color, product_price, product_id)
VALUES
($1, $2, $3)



CREATE TABLE product_size (
  size_id SERIAL PRIMARY KEY,
  product_size VARCHAR(200),
  product_id INT REFERENCES products(product_id)
  )

-- move product price to proguct color table 
-- inside of cart.js all property arrive thru a single prop called products.
