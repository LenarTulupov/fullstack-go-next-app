DROP TABLE IF EXISTS subcategories CASCADE;

CREATE TABLE IF NOT EXIST subcategories {
  id SERIAL PRIMARY KEY
  name VARCHAR(100) NOT NULL UNIQUE
}