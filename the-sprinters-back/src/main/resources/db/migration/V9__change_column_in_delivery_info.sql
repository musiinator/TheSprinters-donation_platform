ALTER TABLE delivery_info
    RENAME COLUMN username TO name;
ALTER TABLE donation
    ADD COLUMN username VARCHAR(255);
