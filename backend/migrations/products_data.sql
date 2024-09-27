-- Добавление уникального ограничения на название продукта (если ещё не добавлено)
ALTER TABLE products ADD CONSTRAINT unique_product_title UNIQUE (title);

-- Вставка данных в таблицу categories, если категории не существует
INSERT INTO categories (name, created_at, updated_at)
SELECT 'trousers', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'trousers');

-- Вставка данных в таблицу colors, если цвет не существует
INSERT INTO colors (name, created_at, updated_at)
SELECT 'beige', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM colors WHERE name = 'beige');

-- Вставка продукта только если такого продукта ещё нет в таблице products
INSERT INTO products (title, description, price_new, price_old, quantity, category_id, available, created_at, updated_at)
SELECT 
    'SUPER STRETCH TAPERED TAILORED TROUSER',
    'Рабочая одежда не должна быть скучной, и эти рабочие брюки — безопасный выбор стиля. Немного более формальная одежда, эти брюки с высокой талией и зауженные к низу. Выбирайте между пуговицей или молнией, эти элегантные брюки нарядны и остры как бритва, внушая серьезное отношение. Всегда практичный элемент гардероба, наденьте их и готовьтесь произвести впечатление в любом профессиональном сценарии или ситуации.',
    20.00,
    25.00,
    10,
    (SELECT id FROM categories WHERE name = 'trousers'),
    TRUE,
    NOW(),
    NOW()
WHERE NOT EXISTS (SELECT 1 FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER');

-- Вставка данных в таблицу thumbnail только если такого изображения ещё нет
INSERT INTO thumbnail (product_id, color_id, thumbnail, created_at, updated_at)
SELECT 
    (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
    (SELECT id FROM colors WHERE name = 'beige' LIMIT 1), 
    'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl/female-stone-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 
    NOW(), 
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM thumbnail 
    WHERE product_id = (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1) 
    AND color_id = (SELECT id FROM colors WHERE name = 'beige' LIMIT 1)
);

-- Вставка данных в таблицу images, проверка дубликатов по ссылкам на изображение
INSERT INTO images (product_id, color_id, image, created_at, updated_at)
SELECT 
    (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
    (SELECT id FROM colors WHERE name = 'beige' LIMIT 1), 
    'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl/female-stone-super-stretch-tapered-tailored-trouser', 
    NOW(), 
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM images 
    WHERE image = 'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl/female-stone-super-stretch-tapered-tailored-trouser'
)
UNION ALL
SELECT 
    (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
    (SELECT id FROM colors WHERE name = 'beige' LIMIT 1), 
    'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_1/female-stone-super-stretch-tapered-tailored-trouser', 
    NOW(), 
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM images 
    WHERE image = 'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_1/female-stone-super-stretch-tapered-tailored-trouser'
)
UNION ALL
SELECT 
    (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
    (SELECT id FROM colors WHERE name = 'beige' LIMIT 1), 
    'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_2/female-stone-super-stretch-tapered-tailored-trouser', 
    NOW(), 
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM images 
    WHERE image = 'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_2/female-stone-super-stretch-tapered-tailored-trouser'
)
UNION ALL
SELECT 
    (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
    (SELECT id FROM colors WHERE name = 'beige' LIMIT 1), 
    'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_3/female-stone-super-stretch-tapered-tailored-trouser', 
    NOW(), 
    NOW()
WHERE NOT EXISTS (
    SELECT 1 FROM images 
    WHERE image = 'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_3/female-stone-super-stretch-tapered-tailored-trouser'
);

-- Вставка данных в таблицу sizes (если эти размеры ещё не существуют)
INSERT INTO sizes (name, abbreviation, created_at, updated_at)
SELECT 'xs', 'XS', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE abbreviation = 'XS')
UNION ALL
SELECT 's', 'S', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE abbreviation = 'S')
UNION ALL
SELECT 'm', 'M', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE abbreviation = 'M')
UNION ALL
SELECT 'l', 'L', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE abbreviation = 'L')
UNION ALL
SELECT 'xl', 'XL', NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM sizes WHERE abbreviation = 'XL');

-- Вставка данных в таблицу product_sizes, проверка на существующие записи
INSERT INTO product_sizes (product_id, size_id)
SELECT 
    (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1), 
    id 
FROM sizes
WHERE NOT EXISTS (
    SELECT 1 FROM product_sizes 
    WHERE product_id = (SELECT id FROM products WHERE title = 'SUPER STRETCH TAPERED TAILORED TROUSER' LIMIT 1) 
    AND size_id = id
);
