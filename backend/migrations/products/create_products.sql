DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    slug TEXT UNIQUE,
    description TEXT,
    price_new DECIMAL(10, 2) NOT NULL,
    price_old DECIMAL(10, 2),
    quantity INT NOT NULL,
    available BOOLEAN NOT NULL,
    subcategory_id INT,
    color_id INT REFERENCES colors(id),
    thumbnail VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);