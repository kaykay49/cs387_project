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

/* add reference to user */
ALTER TABLE reviews
ADD COLUMN username TEXT,
ADD FOREIGN KEY (username) REFERENCES users(username);