/* create reviews table*/
CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    rating DOUBLE PRECISION NOT NULL, 
    title VARCHAR(50),
    comment TEXT,
    recommend BOOLEAN NOT NULL,
    productId TEXT,
    date TEXT
);

/* add data to table */
INSERT INTO reviews (rating, title, comment, recommend, productId, date)
VALUES (
    5, 
    'Great but hard to find', 
    'Upgraded from the ryzen 5 1600 and couldnt be happier. All cores boost to 4.6 stock. I have zero throttling issues with my kraken cooler. Highly recommend if you can get your hands on one.',
    true, 
    '3', 
    '2021-07-27'
);

/* add reference to user */
ALTER TABLE reviews
ADD COLUMN username TEXT,
ADD FOREIGN KEY (username) REFERENCES users(username);