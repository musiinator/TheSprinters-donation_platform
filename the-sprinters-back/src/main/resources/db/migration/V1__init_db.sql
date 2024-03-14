CREATE TABLE platform_user (
    id UUID NOT NULL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(255) NOT NULL,
    created TIMESTAMP NOT NULL
);
