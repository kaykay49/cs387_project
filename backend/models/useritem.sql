/* create useritems table*/
CREATE TABLE useritems(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100),
    price DOUBLE PRECISION NOT NULL,
    quantity INT NOT NULL,
    category VARCHAR(30) NOT NULL,
    imgPath TEXT NOT NULL,
    imgPreview TEXT NOT NULL,
    productPreview TEXT NOT NULL
);

/* add reference to users */
ALTER TABLE useritems
ADD COLUMN username TEXT,
ADD FOREIGN KEY (username) REFERENCES users(username);