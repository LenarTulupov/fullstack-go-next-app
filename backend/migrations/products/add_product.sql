-- Добавление уникального ограничения на название продукта (если ещё не добавлено)
ALTER TABLE products ADD CONSTRAINT unique_product_title UNIQUE (title);

-- Вставка продукта только если такого продукта ещё нет в таблице products
INSERT INTO products (title, description, price_new, price_old, quantity, category_id, color_id, available, created_at, updated_at)
SELECT 
    'SUPER STRETCH TAPERED TAILORED TROUSER',
    'Work clothes don’t have to be boring, and these work trousers are a secure style. Slightly more formal attire, these are tailored, high waisted, and tapered at the ankle. Choose between button or zip-up detail, these are smart pants that are sharply tailored, serving some serious attitude. Always a practical piece to have in your wardrobe, throw these on and prepare to impress in any professional setting or scenario.',
    20.00,
    25.00,
    -- Высчитываем общее количество по размерам
    (SELECT SUM(quantity) FROM product_sizes WHERE product_id = (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1)),
    (SELECT id FROM categories WHERE name = 'trousers'),
    (SELECT id FROM colors WHERE name = 'beige'),
    -- Продукт доступен, если есть хотя бы один размер с положительным количеством
    CASE 
        WHEN (SELECT COUNT(*) FROM product_sizes WHERE product_id = (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1) AND quantity > 0) > 0
        THEN TRUE
        ELSE FALSE
    END,
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER');

-- Вставка данных в таблицу sizes (если эти размеры ещё не существуют)
INSERT INTO sizes (name, abbreviation, description, created_at, updated_at)
SELECT 'xs', 'XS', 'Extra Small', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE abbreviation = 'XS')
UNION ALL
SELECT 's', 'S', 'Small', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE abbreviation = 'S')
UNION ALL
SELECT 'm', 'M', 'Medium', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE abbreviation = 'M')
UNION ALL
SELECT 'l', 'L', 'Large', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE abbreviation = 'L')
UNION ALL
SELECT 'xl', 'XL', 'Extra Large', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE abbreviation = 'XL')
UNION ALL
SELECT 'xxl', 'XXL', 'Extra Extra Large', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE abbreviation = 'XXL');

-- Вставка данных в таблицу product_sizes с учетом доступности
INSERT INTO product_sizes (product_id, size_id, quantity, available)
SELECT 
    (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
    id,
    CASE abbreviation 
        WHEN 'XS' THEN 6
        WHEN 'S' THEN 11
        WHEN 'M' THEN 3
        WHEN 'L' THEN 4
        WHEN 'XL' THEN 7
        ELSE 0 
    END,
    -- Доступность размера зависит от количества
    CASE 
        WHEN CASE abbreviation 
            WHEN 'XS' THEN 6
            WHEN 'S' THEN 11
            WHEN 'M' THEN 3
            WHEN 'L' THEN 4
            WHEN 'XL' THEN 7
            ELSE 0 
        END > 0 THEN TRUE
        ELSE FALSE
    END
FROM sizes
WHERE NOT EXISTS (
    SELECT 1 FROM product_sizes 
    WHERE product_id = (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1) 
    AND size_id = id
);
