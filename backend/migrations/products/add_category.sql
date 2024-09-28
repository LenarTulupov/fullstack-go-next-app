-- Вставка данных в таблицу categories, если категория не существует
INSERT INTO categories (name, created_at, updated_at)
VALUES 
    ('all', NOW(), NOW()),
    ('new', NOW(), NOW()),
    ('summer', NOW(), NOW()),
    ('trends', NOW(), NOW()),
    ('dresses', NOW(), NOW()),
    ('trousers', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;