DROP TABLE IF EXISTS products;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    price_new DECIMAL(10, 2) NOT NULL,
    price_old DECIMAL(10, 2),
    quantity INT NOT NULL,
    available BOOLEAN NOT NULL,
    category_id INT REFERENCES categories(id),
    color_id INT REFERENCES colors(id),
    thumbnail VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);