DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS cartItem CASCADE;
DROP TABLE IF EXISTS cart CASCADE;

DROP TABLE IF EXISTS shop CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE users (
  userid SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  img VARCHAR NULL,
  email VARCHAR  UNIQUE NOT NULL,
  address JSON NULL,
  uid VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE shop (
  shop_id SERIAL PRIMARY KEY,
  sellerid INT NOT NULL,
    FOREIGN KEY (sellerid)
    REFERENCES users(userid)
    ON DELETE CASCADE,
  shop_name VARCHAR UNIQUE NOT NULL,
  description VARCHAR NULL,
  img_shop VARCHAR NULL
);

CREATE TABLE products (
  prod_id SERIAL PRIMARY KEY,
  shop_id INT NOT NULL,
    FOREIGN KEY (shop_id)
    REFERENCES shop(shop_id)
    ON DELETE CASCADE,
  prod_name VARCHAR NOT NULL,
  description VARCHAR,
  imgs JSON NULL,
  price NUMERIC NOT NULL,
  category VARCHAR (100) NOT NULL,
  ratings INT NULL,
  size JSON NULL
);

CREATE TABLE cart (
  cart_id SERIAL PRIMARY KEY,
  userid INT UNIQUE NOT NULL,
    FOREIGN KEY (userid)
    REFERENCES users(userid)
    ON DELETE CASCADE
);

CREATE TABLE cartItem (
  cartItem_id SERIAL PRIMARY KEY,
  cart_id INT NOT NULL,
    FOREIGN KEY (cart_id)
    REFERENCES cart(cart_id)
    ON DELETE CASCADE,
  prod_id INT NOT NULL,
    FOREIGN KEY (prod_id)
    REFERENCES products(prod_id)
    ON DELETE CASCADE,
  quantity INT NOT NULL
);

CREATE TABLE orders (
  orderid SERIAL PRIMARY KEY,
  userid INT NULL,
    FOREIGN KEY (userid)
    REFERENCES users(userid)
    ON DELETE CASCADE,
  purchased JSON NOT NULL,  
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  prod_id INT NOT NULL,
    FOREIGN KEY (prod_id)
    REFERENCES products(prod_id)
    ON DELETE CASCADE,
  userid INT NOT NULL,
    FOREIGN KEY (userid)
    REFERENCES users(userid)
    ON DELETE CASCADE,
  comment VARCHAR NOT NULL,
  rate INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);



INSERT INTO users (username,name,email) VALUES 
('tarek123','tarek','tarek123@gmail.com'),
('brian123','brian','brian123@gmail.com');

INSERT INTO shop (sellerid,shop_name,description,img_shop) VALUES 
(1,'shopped','amazon clone','shop_url');

INSERT INTO products (shop_id,prod_name,price,category) VALUES 
(1,'iPad',499,'tech'),
(1,'macbook',1499,'tech');

INSERT INTO cart (userid) VALUES 
(2);

INSERT INTO cartItem (cart_id,prod_id,quantity) VALUES 
(1,1,5);

INSERT INTO cartItem (cart_id,prod_id,quantity) VALUES 
(1,2,5);

INSERT INTO orders (userid,purchased) VALUES 
(2,{});




