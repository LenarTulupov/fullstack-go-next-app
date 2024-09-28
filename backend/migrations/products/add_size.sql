-- Вставка данных в таблицу size, если размер не существует
INSERT INTO sizes (name, abbreviation, description, created_at, updated_at)
VALUES 
    ('xs', 'XS', 'Extra Small', NOW(), NOW()),
    ('s', 'S', 'Small', NOW(), NOW()),
    ('m', 'M', 'Medium', NOW(), NOW()),
    ('l', 'L', 'Large', NOW(), NOW()),
    ('xl', 'XL', 'Extra Large', NOW(), NOW())
    ('xxl', 'XXL', 'Extra Extra Large', NOW(), NOW())
ON CONFLICT (abbreviation) DO NOTHING;