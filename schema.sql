CREATE DATABASE bamazon;
use bamazon;

CREATE TABLE products (
    item_id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL
);

SELECT * FROM products;

CREATE TABLE departments (
    department_id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    department_name VARCHAR(255) NOT NULL,
    over_head_costs DECIMAL(10,2) NOT NULL
);


ALTER TABLE products
ADD product_sales DECIMAL(10,2);

ALTER TABLE departments
ADD total_sales DECIMAL(10,2);




INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("iPhone 8","ELECTRONICS",250,147),
    ("T-shirt","CLOTHING",59.99,200),
    ("Chocolate","GROCERY",5.50,50),
    ("Cool T shirt","CLOTHING",75.00,50),
    ("Jeans","CLOTHING",54.25,35),
    ("Bike","SPORTS & OUTDOORS",125.00,42),
    ("Catan","ENTERTAINMENT",15.00,25),
    ("Chess","ENTERTAINMENT",25.50,57),
    ("Monopoly","ENTERTAINMENT",30.50,35),
    ("Scrabble","ENTERTAINMENT",19.95,23);

INSERT INTO departments(department_name, over_head_costs)
VALUES ('ENTERTAINMENT', 500.00),
    ('ELECTRONICS', 800.00),
    ('GROCERY', 100.00),
    ('CLOTHING', 200.00),
    ('SPORTS & OUTDOORS', 300.00);