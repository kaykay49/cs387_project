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

/* add data to table */
INSERT INTO products (name, price, quantity, category, imgpath, imgpreview, productpreview, overview)
VALUES (
   'NZXT H510 Elite', 
    149.88,
    1, 
    'Case', 
    'http://i.imgur.com/LfqmqW9.jpg', 
    'http://i.imgur.com/GrmUQgX.jpg', 
    'http://i.imgur.com/AERYN78.png',
    'The clean, modern design, iconic cable management bar, and uninterrupted tempered-glass panels all showcase your stunning build.• Use the intuitive NZXT CAM application to monitor and control your build• Front I/O USB Type-C Port, Dual Tempered Glass, Vertical GPU Mount, and two 140mm AER RGB 2 Fans (included)• MOTHERBOARD SUPPORT: Mini-ITX, MicroATX, and ATX.'
);