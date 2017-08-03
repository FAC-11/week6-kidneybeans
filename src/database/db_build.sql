BEGIN;

DROP TABLE IF EXISTS places CASCADE;

CREATE TABLE places (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  review VARCHAR(1000),
  stars SMALLINT,
  tag VARCHAR(100)
);

INSERT INTO places (name, location, review, stars, tag) VALUES
  ('Chesterfield', 'Roman Road', 'excellent, nice sofas', 6, 'sofas'),
  ('Simply Fresh', 'Roman Road', 'lovely, everyday food', 6, 'food'),
  ('COOP', 'Roman Road', 'they take cards', 3, 'food,cards'),
  ('Mezze', 'Roman Road', 'lamacun!!! delicious and cheap!', 6, 'meat');

COMMIT;
