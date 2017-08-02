BEGIN;

DROP TABLE IF EXISTS places CASCADE;

CREATE TABLE places (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL
);

INSERT INTO places (name, location) VALUES
  ('Chesterfield', 'Roman Road'),
  ('Simply Fresh', 'Roman Road'),
  ('COOP', 'Roman Road');

COMMIT;
