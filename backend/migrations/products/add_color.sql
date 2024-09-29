-- Вставка данных в таблицу colors, если цвет не существует
ALTER TABLE colors ADD CONSTRAINT unique_color_name UNIQUE (name);

-- Вставка данных в таблицу colors, если цвет не существует
INSERT INTO colors (name, created_at, updated_at)
VALUES 
    ('beige', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;
INSERT INTO colors (name, created_at, updated_at)
VALUES 
    ('blue', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;