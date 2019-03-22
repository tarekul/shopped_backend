DROP DATABASE IF EXISTS shopped;
CREATE DATABASE shopped;

\c shopped;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  img VARCHAR NULL,
  email VARCHAR  UNIQUE NOT NULL,
  address JSON NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE shop (
  shop_id SERIAL PRIMARY KEY,
  sellerid INT REFERENCES users(id) NOT NULL,
  shop_name VARCHAR NOT NULL,
  description VARCHAR NULL,
  img_shop VARCHAR NULL
);

CREATE TABLE products (
  prod_id SERIAL PRIMARY KEY,
  shop_id INT REFERENCES shop(shop_id) NOT NULL,
  name VARCHAR NOT NULL,
  description VARCHAR,
  imgs JSON NULL,
  price FLOAT(2) NOT NULL,
  category VARCHAR (100) NOT NULL,
  ratings INT NULL,
  size VARCHAR NULL
);

CREATE TABLE cart (
  cart_id SERIAL PRIMARY KEY,
  userid INT REFERENCES users(id) NOT NULL
);

CREATE TABLE cartItem (
  cartItem_id SERIAL PRIMARY KEY,
  cart_id INT REFERENCES cart(cart_id) NOT NULL,
  prod_id INT REFERENCES products(prod_id) NOT NULL,
  quantity INT
);

CREATE TABLE orders (
  orderid SERIAL PRIMARY KEY,
  userid INT REFERENCES users(id) NULL,
  user_guest VARCHAR NULL,
  totalAmount INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE orderItems (
  orderItemsid SERIAL PRIMARY KEY,  
  orderid INT REFERENCES orders(orderid) NOT NULL,
  prod_id INT REFERENCES products(prod_id) NOT NULL,
  quantity INT NOT NULL
);

CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  prod_id INT REFERENCES products(prod_id) NOT NULL,
  users_id INT REFERENCES users(id) NOT NULL,
  comment VARCHAR NOT NULL,
  rate INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);



INSERT INTO users (username,name,email) VALUES 
('tarek123','tarek','tarek123@gmail.com');

INSERT INTO users (username,name,email) VALUES 
('brian123','brian','brian123@gmail.com');

INSERT INTO shop (sellerid,shop_name,description,img_shop) VALUES 
(1,'shopped','amazon clone','shop_url');
