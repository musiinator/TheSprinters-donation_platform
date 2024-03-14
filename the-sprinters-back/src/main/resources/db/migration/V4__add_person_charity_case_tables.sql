CREATE TABLE charity_case (
                              id UUID NOT NULL PRIMARY KEY,
                              family_name VARCHAR(255) NOT NULL,
                              family_image VARCHAR(255),
                              nr_children INT NOT NULL,
                              nr_boys INT NOT NULL,
                              nr_girls INT NOT NULL,
                              organization_id UUID,
                              city VARCHAR(255),
                              county VARCHAR(255),
                              country VARCHAR(255),
                              created TIMESTAMP NOT NULL,
                              FOREIGN KEY (organization_id) REFERENCES organization(id)
);
CREATE TABLE person (
                        id UUID NOT NULL PRIMARY KEY,
                        first_name VARCHAR(255) NOT NULL,
                        last_name VARCHAR(255) NOT NULL,
                        age VARCHAR(255),
                        description VARCHAR(255),
                        is_child BOOLEAN,
                        gender VARCHAR(255),
                        charity_case_id UUID,
                        created TIMESTAMP NOT NULL,
                        FOREIGN KEY (charity_case_id) REFERENCES charity_case(id)
);

ALTER TABLE person
    ADD CONSTRAINT fk_charity_case
        FOREIGN KEY (charity_case_id) REFERENCES charity_case(id);
