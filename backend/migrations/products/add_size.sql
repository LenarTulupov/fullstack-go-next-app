-- Вставка данных в таблицу size, если размер не существует
INSERT INTO sizes (name, abbreviation, description, created_at, updated_at)
SELECT 'xs', 'XS', 'Extra Small', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE name = 'xs');

INSERT INTO sizes (name, abbreviation, description, created_at, updated_at)
SELECT 's', 'S', 'Small', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE name = 's');

INSERT INTO sizes (name, abbreviation, description, created_at, updated_at)
SELECT 'm', 'M', 'Medium', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE name = 'm');

INSERT INTO sizes (name, abbreviation, description, created_at, updated_at)
SELECT 'l', 'L', 'Large', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE name = 'l');

INSERT INTO sizes (name, abbreviation, description, created_at, updated_at)
SELECT 'xl', 'XL', 'Extra Large', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE name = 'xl');

INSERT INTO sizes (name, abbreviation, description, created_at, updated_at)
SELECT 'xxl', 'XXL', 'Extra Extra Large', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE name = 'xxl');