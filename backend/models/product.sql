/* create products table*/
CREATE TABLE products(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100),
    price DOUBLE PRECISION NOT NULL,
    quantity INT NOT NULL,
    category VARCHAR(30) NOT NULL,
    imgPath TEXT NOT NULL,
    imgPreview TEXT NOT NULL,
    productPreview TEXT NOT NULL,
    overview TEXT NOT NULL
);
