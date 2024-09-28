-- Вставка данных в таблицу categories, если категория не существует
INSERT INTO categories (name, created_at, updated_at)
SELECT 'all', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'all')
UNION ALL
SELECT 'new', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'new')
UNION ALL
SELECT 'summer', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'summer')
UNION ALL
SELECT 'trends', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'trends')
UNION ALL
SELECT 'dresses', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'dresses');
UNION ALL
SELECT 'trousers', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'trousers');