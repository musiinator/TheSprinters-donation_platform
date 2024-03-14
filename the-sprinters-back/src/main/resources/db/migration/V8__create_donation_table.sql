CREATE TABLE donation
(
    id               UUID         NOT NULL PRIMARY KEY,
    created          timestamp    NOT NULL,
    note             VARCHAR(255),
    donation_date    date         NOT NULL,
    delivery_method  VARCHAR(255) NOT NULL,
    items            jsonb        NOT NULL,
    delivery_info_id UUID         NOT NULL,
    charity_case_id  UUID         NOT NULL
);

CREATE TABLE delivery_info
(
    id               UUID         NOT NULL PRIMARY KEY,
    created          timestamp    NOT NULL,
    username         VARCHAR(255) NOT NULL,
    address          VARCHAR(255) NOT NULL,
    delivery_company VARCHAR(255) NOT NULL,
    phone_number     VARCHAR(255) NOT NULL
);

ALTER TABLE donation
    ADD CONSTRAINT fk_charity_case
        FOREIGN KEY (charity_case_id) REFERENCES charity_case (id);
ALTER TABLE donation
    ADD CONSTRAINT fk_delivery_info
        FOREIGN KEY (delivery_info_id) REFERENCES delivery_info (id);
