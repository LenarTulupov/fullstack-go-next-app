-- Вставка данных в таблицу colors, если цвет не существует
INSERT INTO colors (name, created_at, updated_at)
VALUES 
    ('beige', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;