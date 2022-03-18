-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS socks;

CREATE TABLE socks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    brand TEXT NOT NULL,
    condition TEXT NOT NULL,
    is_paired BOOLEAN
);

INSERT INTO 
  socks (brand, condition, is_paired)
VALUES
  ('kroger', 'tattered', false),
  ('Champion', 'pristine', true),
  ('Victorias Secret', 'in ruins', false);