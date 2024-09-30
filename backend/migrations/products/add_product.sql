BEGIN;

-- Уникальное ограничение на название продукта и цвет
ALTER TABLE products ADD CONSTRAINT unique_product_title_color UNIQUE (title, color_id);

-- Вставка размеров, если их еще нет в таблице sizes
INSERT INTO sizes (name, abbreviation, description, created_at, updated_at)
VALUES 
    ('xs', 'XS', 'Extra Small', NOW(), NOW()),
    ('s', 'S', 'Small', NOW(), NOW()),
    ('m', 'M', 'Medium', NOW(), NOW()),
    ('l', 'L', 'Large', NOW(), NOW()),
    ('xl', 'XL', 'Extra Large', NOW(), NOW()),
    ('xxl', 'XXL', 'Extra Extra Large', NOW(), NOW())
ON CONFLICT (abbreviation) DO NOTHING;

-- Вставка продукта или получение существующего
WITH inserted_product AS (
    INSERT INTO products (title, description, price_new, price_old, quantity, category_id, color_id, available, created_at, updated_at)
    VALUES 
        ('SUPER STRETCH TAPERED TAILORED TROUSER', 
        'Work clothes don’t have to be boring, and these trousers will give you all the confidence!', 
        20.00, 
        25.00, 
        31, 
        (SELECT id FROM categories WHERE name = 'trousers'), 
        (SELECT id FROM colors WHERE name = 'beige'), 
        TRUE, 
        NOW(), 
        NOW())
    ON CONFLICT (title, color_id) DO NOTHING
    RETURNING id
)
-- Получение id продукта
SELECT id FROM inserted_product
UNION
SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' 
AND color_id = (SELECT id FROM colors WHERE name = 'beige') LIMIT 1;

-- Вставка миниатюры продукта
WITH product_id AS (
    SELECT id FROM inserted_product
    UNION
    SELECT id FROM products 
    WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' 
    AND color_id = (SELECT id FROM colors WHERE name = 'beige') LIMIT 1
)
INSERT INTO thumbnail (product_id, color_id, thumbnail, created_at, updated_at)
SELECT id, (SELECT id FROM colors WHERE name = 'beige'), 
'images/products/super-stretch-tapered-tailored-trouser/thumbnail/beige.jpg', NOW(), NOW()
FROM product_id
ON CONFLICT (product_id, color_id) DO NOTHING;

-- Вставка изображений продукта
WITH product_id AS (
    SELECT id FROM inserted_product
    UNION
    SELECT id FROM products 
    WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' 
    AND color_id = (SELECT id FROM colors WHERE name = 'beige') LIMIT 1
)
INSERT INTO images (product_id, color_id, image, created_at, updated_at)
SELECT id, (SELECT id FROM colors WHERE name = 'beige'), img.url, NOW(), NOW()
FROM product_id, (VALUES 
        ('images/products/super-stretch-tapered-tailored-trouser/beige_1.jpg'),
        ('images/products/super-stretch-tapered-tailored-trouser/beige_2.jpg'),
        ('images/products/super-stretch-tapered-tailored-trouser/beige_3.jpg')) AS img(url)
ON CONFLICT (product_id, image) DO NOTHING;

-- Вставка размеров продукта
WITH product_id AS (
    SELECT id FROM inserted_product
    UNION
    SELECT id FROM products 
    WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' 
    AND color_id = (SELECT id FROM colors WHERE name = 'beige') LIMIT 1
)
INSERT INTO product_sizes (product_id, size_id, quantity, available, created_at, updated_at)
SELECT id, s.id, COALESCE(
    CASE s.abbreviation 
        WHEN 'XS' THEN 6
        WHEN 'S' THEN 11
        WHEN 'M' THEN 3
        WHEN 'L' THEN 4
        WHEN 'XL' THEN 7
        ELSE 0 
    END, 0), TRUE, NOW(), NOW()
FROM product_id, sizes s
ON CONFLICT (product_id, size_id) DO NOTHING;

COMMIT;

-- Вставка второго продукта с аналогичной структурой
BEGIN;

WITH inserted_product_2 AS (
    INSERT INTO products (title, description, price_new, price_old, quantity, category_id, color_id, available, created_at, updated_at)
    VALUES 
        ('SUPER STRETCH TAPERED TAILORED TROUSER', 
        'Another variant of work clothes.', 
        20.00, 
        25.00, 
        31, 
        (SELECT id FROM categories WHERE name = 'trousers'), 
        (SELECT id FROM colors WHERE name = 'blue'), 
        TRUE, 
        NOW(), 
        NOW())
    ON CONFLICT (title, color_id) DO NOTHING
    RETURNING id
)
SELECT id FROM inserted_product_2
UNION
SELECT id FROM products 
WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' 
AND color_id = (SELECT id FROM colors WHERE name = 'blue') LIMIT 1;

WITH product_id AS (
    SELECT id FROM inserted_product_2
    UNION
    SELECT id FROM products 
    WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' 
    AND color_id = (SELECT id FROM colors WHERE name = 'blue') LIMIT 1
)
INSERT INTO thumbnail (product_id, color_id, thumbnail, created_at, updated_at)
SELECT id, (SELECT id FROM colors WHERE name = 'blue'), 
'images/products/super-stretch-tapered-tailored-trouser/thumbnail/blue.jpg', NOW(), NOW()
FROM product_id
ON CONFLICT (product_id, color_id) DO NOTHING;

WITH product_id AS (
    SELECT id FROM inserted_product_2
    UNION
    SELECT id FROM products 
    WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' 
    AND color_id = (SELECT id FROM colors WHERE name = 'blue') LIMIT 1
)
INSERT INTO images (product_id, color_id, image, created_at, updated_at)
SELECT id, (SELECT id FROM colors WHERE name = 'blue'), img.url, NOW(), NOW()
FROM product_id, (VALUES 
        ('images/products/super-stretch-tapered-tailored-trouser/blue_1.jpg'),
        ('images/products/super-stretch-tapered-tailored-trouser/blue_2.jpg'),
        ('images/products/super-stretch-tapered-tailored-trouser/blue_3.jpg')) AS img(url)
ON CONFLICT (product_id, image) DO NOTHING;

WITH product_id AS (
    SELECT id FROM inserted_product_2
    UNION
    SELECT id FROM products 
    WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' 
    AND color_id = (SELECT id FROM colors WHERE name = 'blue') LIMIT 1
)
INSERT INTO product_sizes (product_id, size_id, quantity, available, created_at, updated_at)
SELECT id, s.id, COALESCE(
    CASE s.abbreviation 
        WHEN 'XS' THEN 6
        WHEN 'S' THEN 11
        WHEN 'M' THEN 3
        WHEN 'L' THEN 4
        WHEN 'XL' THEN 7
        ELSE 0 
    END, 0), TRUE, NOW(), NOW()
FROM product_id, sizes s
ON CONFLICT (product_id, size_id) DO NOTHING;

COMMIT;


-- -- Это был предпоследний почти рабочий вариант

-- -- Добавление уникального ограничения на название продукта и цвет (если еще не добавлено)
-- ALTER TABLE products ADD CONSTRAINT unique_product_title_color UNIQUE (title, color_id);

-- -- Вставка размеров в таблицу sizes с учетом уникального ограничения
-- INSERT INTO sizes (name, abbreviation, description, created_at, updated_at)
-- VALUES 
--     ('xs', 'XS', 'Extra Small', NOW(), NOW()),
--     ('s', 'S', 'Small', NOW(), NOW()),
--     ('m', 'M', 'Medium', NOW(), NOW()),
--     ('l', 'L', 'Large', NOW(), NOW()),
--     ('xl', 'XL', 'Extra Large', NOW(), NOW()),
--     ('xxl', 'XXL', 'Extra Extra Large', NOW(), NOW())
-- ON CONFLICT (abbreviation) DO NOTHING;

-- -- Вставка первого продукта
-- INSERT INTO products (title, description, price_new, price_old, quantity, category_id, color_id, available, created_at, updated_at)
-- SELECT 
--     'SUPER STRETCH TAPERED TAILORED TROUSER',
--     'Work clothes don’t have to be boring, and these work trousers are a secure style. Slightly more formal attire, these are tailored, high waisted, and tapered at the ankle. Choose between button or zip-up detail, these are smart pants that are sharply tailored, serving some serious attitude. Always a practical piece to have in your wardrobe, throw these on and prepare to impress in any professional setting or scenario.',
--     20.00,
--     25.00,
--     COALESCE(
--         (SELECT SUM(quantity) FROM product_sizes WHERE product_id = (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1)),
--         0
--     ),
--     (SELECT id FROM categories WHERE name = 'trousers'),
--     (SELECT id FROM colors WHERE name = 'beige'),
--     TRUE,
--     NOW(),
--     NOW();

-- -- Вставка миниатюры для продукта
-- INSERT INTO thumbnail (product_id, color_id, thumbnail, created_at, updated_at)
-- SELECT 
--     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
--     (SELECT id FROM colors WHERE name = 'beige' LIMIT 1), 
--     'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl/female-stone-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 
--     NOW(), 
--     NOW();

-- -- Вставка изображений для продукта
-- INSERT INTO images (product_id, color_id, image, created_at, updated_at)
-- SELECT 
--     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
--     (SELECT id FROM colors WHERE name = 'beige' LIMIT 1), 
--     'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl/female-stone-super-stretch-tapered-tailored-trouser', 
--     NOW(), 
--     NOW()
-- UNION ALL
-- SELECT 
--     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
--     (SELECT id FROM colors WHERE name = 'beige' LIMIT 1), 
--     'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_1/female-stone-super-stretch-tapered-tailored-trouser', 
--     NOW(), 
--     NOW()
-- UNION ALL
-- SELECT 
--     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
--     (SELECT id FROM colors WHERE name = 'beige' LIMIT 1), 
--     'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_2/female-stone-super-stretch-tapered-tailored-trouser', 
--     NOW(), 
--     NOW()
-- UNION ALL
-- SELECT 
--     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
--     (SELECT id FROM colors WHERE name = 'beige' LIMIT 1), 
--     'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_3/female-stone-super-stretch-tapered-tailored-trouser', 
--     NOW(), 
--     NOW();

-- -- Вставка данных в product_sizes
-- INSERT INTO product_sizes (product_id, size_id, quantity, available)
-- SELECT 
--     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
--     id,
--     COALESCE(
--         CASE abbreviation 
--             WHEN 'XS' THEN 6
--             WHEN 'S' THEN 11
--             WHEN 'M' THEN 3
--             WHEN 'L' THEN 4
--             WHEN 'XL' THEN 7
--             ELSE 0 
--         END, 0),
--     TRUE
-- FROM sizes;

-- -- Вставка второго продукта
-- INSERT INTO products (title, description, price_new, price_old, quantity, category_id, color_id, available, created_at, updated_at)
-- SELECT 
--     'SUPER STRETCH TAPERED TAILORED TROUSER',
--     'Work clothes don’t have to be boring, and these work trousers are a secure style. Slightly more formal attire, these are tailored, high waisted, and tapered at the ankle. Choose between button or zip-up detail, these are smart pants that are sharply tailored, serving some serious attitude. Always a practical piece to have in your wardrobe, throw these on and prepare to impress in any professional setting or scenario.',
--     20.00,
--     25.00,
--     COALESCE(
--         (SELECT SUM(quantity) FROM product_sizes WHERE product_id = (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1)),
--         0
--     ),
--     (SELECT id FROM categories WHERE name = 'trousers'),
--     (SELECT id FROM colors WHERE name = 'blue'),
--     TRUE,
--     NOW(),
--     NOW();

-- -- Вставка миниатюры для второго продукта
-- INSERT INTO thumbnail (product_id, color_id, thumbnail, created_at, updated_at)
-- SELECT 
--     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
--     (SELECT id FROM colors WHERE name = 'blue' LIMIT 1), 
--     'https://media.boohoo.com/i/boohoo/fzz77463_navy_xl/female-navy-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 
--     NOW(), 
--     NOW();

-- -- Вставка изображений для второго продукта
-- INSERT INTO images (product_id, color_id, image, created_at, updated_at)
-- SELECT 
--     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
--     (SELECT id FROM colors WHERE name = 'blue' LIMIT 1), 
--     'https://media.boohoo.com/i/boohoo/fzz77463_navy_xl/female-navy-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 
--     NOW(), 
--     NOW()
-- UNION ALL
-- SELECT 
--     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
--     (SELECT id FROM colors WHERE name = 'blue' LIMIT 1), 
--     'https://media.boohoo.com/i/boohoo/fzz77463_navy_xl_1/female-navy-super-stretch-tapered-tailored-trouser', 
--     NOW(), 
--     NOW()
-- UNION ALL
-- SELECT 
--     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
--     (SELECT id FROM colors WHERE name = 'blue' LIMIT 1), 
--     'https://media.boohoo.com/i/boohoo/fzz77463_navy_xl_2/female-navy-super-stretch-tapered-tailored-trouser', 
--     NOW(), 
--     NOW();






-- -- -- Adding a unique constraint on product title and color (if not already added)
-- -- ALTER TABLE products ADD CONSTRAINT unique_product_title_color UNIQUE (title, color_id);

-- -- -- Inserting the first product only if it does not already exist in the products table
-- -- INSERT INTO products (title, description, price_new, price_old, quantity, category_id, color_id, available, created_at, updated_at)
-- -- SELECT 
-- --     'SUPER STRETCH TAPERED TAILORED TROUSER',
-- --     'Work clothes don’t have to be boring, and these work trousers are a secure style. Slightly more formal attire, these are tailored, high waisted, and tapered at the ankle. Choose between button or zip-up detail, these are smart pants that are sharply tailored, serving some serious attitude. Always a practical piece to have in your wardrobe, throw these on and prepare to impress in any professional setting or scenario.',
-- --     20.00,
-- --     25.00,
-- --     COALESCE(
-- --         (SELECT SUM(quantity) FROM product_sizes WHERE product_id = (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1)),
-- --         0  -- Default value if subquery returns NULL
-- --     ),
-- --     (SELECT id FROM categories WHERE name = 'trousers'),
-- --     (SELECT id FROM colors WHERE name = 'beige'),
-- --     -- The product is available if there is at least one size with a positive quantity
-- --     CASE 
-- --         WHEN (SELECT COUNT(*) FROM product_sizes WHERE product_id = (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1) AND quantity > 0) > 0
-- --         THEN TRUE
-- --         ELSE FALSE
-- --     END,
-- --     NOW(),
-- --     NOW()
-- -- WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER');

-- -- -- Inserting sizes into the sizes table (if they do not already exist)
-- -- INSERT INTO sizes (name, abbreviation, description, created_at, updated_at)
-- -- SELECT 'xs', 'XS', 'Extra Small', NOW(), NOW()
-- -- WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE abbreviation = 'XS')
-- -- UNION ALL
-- -- SELECT 's', 'S', 'Small', NOW(), NOW()
-- -- WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE abbreviation = 'S')
-- -- UNION ALL
-- -- SELECT 'm', 'M', 'Medium', NOW(), NOW()
-- -- WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE abbreviation = 'M')
-- -- UNION ALL
-- -- SELECT 'l', 'L', 'Large', NOW(), NOW()
-- -- WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE abbreviation = 'L')
-- -- UNION ALL
-- -- SELECT 'xl', 'XL', 'Extra Large', NOW(), NOW()
-- -- WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE abbreviation = 'XL')
-- -- UNION ALL
-- -- SELECT 'xxl', 'XXL', 'Extra Extra Large', NOW(), NOW()
-- -- WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE abbreviation = 'XXL');

-- -- -- Inserting thumbnail for the product, checking for duplicates
-- -- INSERT INTO thumbnail (product_id, color_id, thumbnail, created_at, updated_at)
-- -- SELECT 
-- --     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
-- --     (SELECT id FROM colors WHERE name = 'beige' LIMIT 1), 
-- --     'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl/female-stone-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 
-- --     NOW(), 
-- --     NOW()
-- -- WHERE NOT EXISTS (
-- --     SELECT 1 FROM thumbnail 
-- --     WHERE product_id = (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1) 
-- --     AND color_id = (SELECT id FROM colors WHERE name = 'beige' LIMIT 1)
-- -- );

-- -- -- Inserting images for the product, checking for duplicates based on image links
-- -- INSERT INTO images (product_id, color_id, image, created_at, updated_at)
-- -- SELECT 
-- --     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
-- --     (SELECT id FROM colors WHERE name = 'beige' LIMIT 1), 
-- --     'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl/female-stone-super-stretch-tapered-tailored-trouser', 
-- --     NOW(), 
-- --     NOW()
-- -- WHERE NOT EXISTS (
-- --     SELECT 1 FROM images 
-- --     WHERE image = 'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl/female-stone-super-stretch-tapered-tailored-trouser'
-- -- )
-- -- UNION ALL
-- -- SELECT 
-- --     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
-- --     (SELECT id FROM colors WHERE name = 'beige' LIMIT 1), 
-- --     'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_1/female-stone-super-stretch-tapered-tailored-trouser', 
-- --     NOW(), 
-- --     NOW()
-- -- WHERE NOT EXISTS (
-- --     SELECT 1 FROM images 
-- --     WHERE image = 'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_1/female-stone-super-stretch-tapered-tailored-trouser'
-- -- )
-- -- UNION ALL
-- -- SELECT 
-- --     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
-- --     (SELECT id FROM colors WHERE name = 'beige' LIMIT 1), 
-- --     'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_2/female-stone-super-stretch-tapered-tailored-trouser', 
-- --     NOW(), 
-- --     NOW()
-- -- WHERE NOT EXISTS (
-- --     SELECT 1 FROM images 
-- --     WHERE image = 'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_2/female-stone-super-stretch-tapered-tailored-trouser'
-- -- )
-- -- UNION ALL
-- -- SELECT 
-- --     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
-- --     (SELECT id FROM colors WHERE name = 'beige' LIMIT 1), 
-- --     'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_3/female-stone-super-stretch-tapered-tailored-trouser', 
-- --     NOW(), 
-- --     NOW()
-- -- WHERE NOT EXISTS (
-- --     SELECT 1 FROM images 
-- --     WHERE image = 'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_3/female-stone-super-stretch-tapered-tailored-trouser'
-- -- );

-- -- -- Inserting data into product_sizes while considering availability
-- -- INSERT INTO product_sizes (product_id, size_id, quantity, available)
-- -- SELECT 
-- --     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
-- --     id,
-- --     COALESCE(
-- --         CASE abbreviation 
-- --             WHEN 'XS' THEN 6
-- --             WHEN 'S' THEN 11
-- --             WHEN 'M' THEN 3
-- --             WHEN 'L' THEN 4
-- --             WHEN 'XL' THEN 7
-- --             ELSE 0 
-- --         END, 0),  -- Default value if subquery returns NULL
-- --     -- Availability of size depends on quantity
-- --     CASE 
-- --         WHEN COALESCE(
-- --             CASE abbreviation 
-- --                 WHEN 'XS' THEN 6
-- --                 WHEN 'S' THEN 11
-- --                 WHEN 'M' THEN 3
-- --                 WHEN 'L' THEN 4
-- --                 WHEN 'XL' THEN 7
-- --                 ELSE 0 
-- --             END, 0) > 0 THEN TRUE
-- --         ELSE FALSE
-- --     END
-- -- FROM sizes
-- -- WHERE NOT EXISTS (
-- --     SELECT 1 FROM product_sizes 
-- --     WHERE product_id = (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1) 
-- --     AND size_id = id
-- -- );

-- -- -- Inserting the second product only if it does not already exist in the products table
-- -- INSERT INTO products (title, description, price_new, price_old, quantity, category_id, color_id, available, created_at, updated_at)
-- -- SELECT 
-- --     'SUPER STRETCH TAPERED TAILORED TROUSER',
-- --     'Work clothes don’t have to be boring, and these work trousers are a secure style. Slightly more formal attire, these are tailored, high waisted, and tapered at the ankle. Choose between button or zip-up detail, these are smart pants that are sharply tailored, serving some serious attitude. Always a practical piece to have in your wardrobe, throw these on and prepare to impress in any professional setting or scenario.',
-- --     20.00,
-- --     25.00,
-- --     COALESCE(
-- --         (SELECT SUM(quantity) FROM product_sizes WHERE product_id = (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1)),
-- --         0  -- Default value if subquery returns NULL
-- --     ),
-- --     (SELECT id FROM categories WHERE name = 'trousers'),
-- --     (SELECT id FROM colors WHERE name = 'blue'),
-- --     -- The product is available if there is at least one size with a positive quantity
-- --     CASE 
-- --         WHEN (SELECT COUNT(*) FROM product_sizes WHERE product_id = (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1) AND quantity > 0) > 0
-- --         THEN TRUE
-- --         ELSE FALSE
-- --     END,
-- --     NOW(),
-- --     NOW()
-- -- WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER');

-- -- -- Inserting thumbnail for the second product, checking for duplicates
-- -- INSERT INTO thumbnail (product_id, color_id, thumbnail, created_at, updated_at)
-- -- SELECT 
-- --     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
-- --     (SELECT id FROM colors WHERE name = 'blue' LIMIT 1), 
-- --     'https://media.boohoo.com/i/boohoo/fzz77463_navy_xl/female-navy-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 
-- --     NOW(), 
-- --     NOW()
-- -- WHERE NOT EXISTS (
-- --     SELECT 1 FROM thumbnail 
-- --     WHERE product_id = (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1) 
-- --     AND color_id = (SELECT id FROM colors WHERE name = 'blue' LIMIT 1)
-- -- );

-- -- -- Inserting images for the second product, checking for duplicates based on image links
-- -- INSERT INTO images (product_id, color_id, image, created_at, updated_at)
-- -- SELECT 
-- --     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
-- --     (SELECT id FROM colors WHERE name = 'blue' LIMIT 1), 
-- --     'https://media.boohoo.com/i/boohoo/fzz77463_navy_xl/female-navy-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 
-- --     NOW(), 
-- --     NOW()
-- -- WHERE NOT EXISTS (
-- --     SELECT 1 FROM images 
-- --     WHERE image = 'https://media.boohoo.com/i/boohoo/fzz77463_navy_xl/female-navy-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit'
-- -- )
-- -- UNION ALL
-- -- SELECT 
-- --     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
-- --     (SELECT id FROM colors WHERE name = 'blue' LIMIT 1), 
-- --     'https://media.boohoo.com/i/boohoo/fzz77463_navy_xl_1/female-navy-super-stretch-tapered-tailored-trouser', 
-- --     NOW(), 
-- --     NOW()
-- -- WHERE NOT EXISTS (
-- --     SELECT 1 FROM images 
-- --     WHERE image = 'https://media.boohoo.com/i/boohoo/fzz77463_navy_xl_1/female-navy-super-stretch-tapered-tailored-trouser'
-- -- )
-- -- UNION ALL
-- -- SELECT 
-- --     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
-- --     (SELECT id FROM colors WHERE name = 'blue' LIMIT 1), 
-- --     'https://media.boohoo.com/i/boohoo/fzz77463_navy_xl_2/female-navy-super-stretch-tapered-tailored-trouser', 
-- --     NOW(), 
-- --     NOW()
-- -- WHERE NOT EXISTS (
-- --     SELECT 1 FROM images 
-- --     WHERE image = 'https://media.boohoo.com/i/boohoo/fzz77463_navy_xl_2/female-navy-super-stretch-tapered-tailored-trouser'
-- -- )
-- -- UNION ALL
-- -- SELECT 
-- --     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
-- --     (SELECT id FROM colors WHERE name = 'blue' LIMIT 1), 
-- --     'https://media.boohoo.com/i/boohoo/fzz77463_navy_xl_3/female-navy-super-stretch-tapered-tailored-trouser', 
-- --     NOW(), 
-- --     NOW()
-- -- WHERE NOT EXISTS (
-- --     SELECT 1 FROM images 
-- --     WHERE image = 'https://media.boohoo.com/i/boohoo/fzz77463_navy_xl_3/female-navy-super-stretch-tapered-tailored-trouser'
-- -- );

-- -- -- Inserting data into product_sizes for the second product while considering availability
-- -- INSERT INTO product_sizes (product_id, size_id, quantity, available)
-- -- SELECT 
-- --     (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
-- --     id,
-- --     COALESCE(
-- --         CASE abbreviation 
-- --             WHEN 'XS' THEN 5
-- --             WHEN 'S' THEN 12
-- --             WHEN 'M' THEN 6
-- --             WHEN 'L' THEN 3
-- --             WHEN 'XL' THEN 9
-- --             WHEN 'XXL' THEN 1
-- --             ELSE 0 
-- --         END, 0), 
-- --     CASE 
-- --         WHEN COALESCE(
-- --             CASE abbreviation 
-- --                 WHEN 'XS' THEN 5
-- --                 WHEN 'S' THEN 12
-- --                 WHEN 'M' THEN 6
-- --                 WHEN 'L' THEN 3
-- --                 WHEN 'XL' THEN 9
-- --                 WHEN 'XXL' THEN 1
-- --                 ELSE 0 
-- --             END, 0) > 0 THEN TRUE
-- --         ELSE FALSE
-- --     END
-- -- FROM sizes
-- -- WHERE NOT EXISTS (
-- --     SELECT 1 FROM product_sizes 
-- --     WHERE product_id = (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1) 
-- --     AND size_id = id
-- -- );
