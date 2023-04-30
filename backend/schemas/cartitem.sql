/* create cartitems table*/
CREATE TABLE cartitems(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100),
    price DOUBLE PRECISION NOT NULL,
    quantity INT NOT NULL,
    category VARCHAR(30) NOT NULL,
    imgPath TEXT NOT NULL,
    imgPreview TEXT NOT NULL,
    productPreview TEXT NOT NULL
);

/* add data to table */
INSERT INTO cartitems (name, price, quantity, category, imgPath, imgPreview, productPreview)
VALUES (
    'AMD Ryzen 5 5800X', 
    499.99, 
    1, 
    'Processors', 
    'http://i.imgur.com/xuuS84t.png', 
    'http://i.imgur.com/m4Bppno.jpg', 
    'http://i.imgur.com/0szXExr.png'
);