DROP TABLE IF EXISTS sizes CASCADE;

CREATE TABLE IF NOT EXISTS sizes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(10) NOT NULL,
  abbreviation VARCHAR(10) NOT NULL,
  description VARCHAR(255),
  quantity INT NOT NULL,
  available BOOLEAN NOT NULL
);