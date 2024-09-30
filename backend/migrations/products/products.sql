DROP TABLE IF EXISTS product_colors CASCADE;
DROP TABLE IF EXISTS product_sizes CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS thumbnail CASCADE;
DROP TABLE IF EXISTS images CASCADE;

CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price_new NUMERIC(10, 2) NOT NULL,
    price_old NUMERIC(10, 2),
    quantity INTEGER NOT NULL CHECK (quantity >= 0),
    category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
    color_id BIGINT REFERENCES colors(id) ON DELETE CASCADE NOT NULL,
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_colors (
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    color_id BIGINT REFERENCES colors(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (product_id, color_id)
);

CREATE TABLE IF NOT EXISTS product_sizes (
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    size_id BIGINT REFERENCES sizes(id) ON DELETE CASCADE,
    available BOOLEAN DEFAULT TRUE,
    quantity INTEGER NOT NULL CHECK (quantity >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (product_id, size_id)
);

CREATE TABLE IF NOT EXISTS thumbnail (
    id SERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    color_id BIGINT REFERENCES colors(id) ON DELETE CASCADE,
    thumbnail VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Удаление уникального ограничения, если оно существует
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'unique_product_title_color') THEN
        ALTER TABLE products DROP CONSTRAINT unique_product_title_color;
    END IF;
END $$;

-- Добавление уникального ограничения на title и color_id в таблице products
ALTER TABLE products ADD CONSTRAINT unique_product_title_color UNIQUE (title, color_id);

CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    color_id BIGINT REFERENCES colors(id) ON DELETE CASCADE,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




-- DROP TABLE IF EXISTS product_colors CASCADE;
-- DROP TABLE IF EXISTS product_sizes CASCADE;
-- DROP TABLE IF EXISTS products CASCADE;
-- DROP TABLE IF EXISTS thumbnail CASCADE;
-- DROP TABLE IF EXISTS images CASCADE;

-- CREATE TABLE IF NOT EXISTS products (
--     id BIGSERIAL PRIMARY KEY,
--     title VARCHAR(255) NOT NULL,
--     description TEXT NOT NULL,
--     price_new NUMERIC(10, 2) NOT NULL,
--     price_old NUMERIC(10, 2),
--     quantity INTEGER NOT NULL CHECK (quantity >= 0),
--     category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
--     color_id BIGINT REFERENCES colors(id) ON DELETE CASCADE NOT NULL,
--     available BOOLEAN DEFAULT TRUE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE IF NOT EXISTS product_colors (
--     product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
--     color_id BIGINT REFERENCES colors(id) ON DELETE CASCADE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     PRIMARY KEY (product_id, color_id)
-- );

-- CREATE TABLE IF NOT EXISTS product_sizes (
--     product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
--     size_id BIGINT REFERENCES sizes(id) ON DELETE CASCADE,
--     available BOOLEAN DEFAULT TRUE,
--     quantity INTEGER NOT NULL CHECK (quantity >= 0),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     PRIMARY KEY (product_id, size_id)
-- );

-- CREATE TABLE IF NOT EXISTS thumbnail (
--     id SERIAL PRIMARY KEY,
--     product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
--     color_id BIGINT REFERENCES colors(id) ON DELETE CASCADE,
--     thumbnail VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     UNIQUE (product_id, color_id)
-- );

-- CREATE TABLE images (
--     id SERIAL PRIMARY KEY,
--     product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
--     color_id BIGINT REFERENCES colors(id) ON DELETE CASCADE,
--     image VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
