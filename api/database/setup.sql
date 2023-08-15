DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS images;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

INSERT INTO user_account
    (username, password)
    VALUES
    ('Marcus', 'password');

CREATE TABLE images (
    image_id INT GENERATED ALWAYS AS IDENTITY,
    image_title VARCHAR (100) NOT NULL,
    image_description VARCHAR (500) NOT NULL,
    image_type VARCHAR (30) NOT NULL,
    image_data BYTEA NOT NULL,
    PRIMARY KEY (image_id)
);