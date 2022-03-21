-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS socks, games;

CREATE TABLE socks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    brand TEXT NOT NULL,
    condition TEXT NOT NULL,
    is_paired BOOLEAN NOT NULL
);

CREATE TABLE games (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    system TEXT NOT NULL
);

INSERT INTO
  games (name, system)
VALUES
  ('super mario 3', 'NES'),
  ('destiny', 'cross-platform'),
  ('hearthstone', 'pc and mobile');

INSERT INTO 
  socks (brand, condition, is_paired)
VALUES
  ('kroger', 'fine', false),
  ('Champion', 'pristine', true),
  ('Victorias Secret', 'in ruins', false);