-- Вставка данных в таблицу colors, если цвет не существует
INSERT INTO colors (name, created_at, updated_at)
SELECT 'beige', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM colors WHERE name = 'beige');