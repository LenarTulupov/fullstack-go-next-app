-- Добавление уникального ограничения на название продукта и цвет (если еще не добавлено)
ALTER TABLE products ADD CONSTRAINT unique_product_title_color UNIQUE (title, color_id);

-- Вставка размеров в таблицу sizes с учетом уникального ограничения
INSERT INTO sizes (name, abbreviation, description, created_at, updated_at)
VALUES 
    ('xs', 'XS', 'Extra Small', NOW(), NOW()),
    ('s', 'S', 'Small', NOW(), NOW()),
    ('m', 'M', 'Medium', NOW(), NOW()),
    ('l', 'L', 'Large', NOW(), NOW()),
    ('xl', 'XL', 'Extra Large', NOW(), NOW()),
    ('xxl', 'XXL', 'Extra Extra Large', NOW(), NOW())
ON CONFLICT (abbreviation) DO NOTHING;

-- Вставка первого продукта
WITH new_product AS (
  INSERT INTO products (title, description, price_new, price_old, quantity, category_id, color_id, available, created_at, updated_at)
  SELECT 
      'SUPER STRETCH TAPERED TAILORED TROUSER',
      'Work clothes don’t have to be boring, and these work trousers are a secure style. Slightly more formal attire, these are tailored, high waisted, and tapered at the ankle.',
      20.00,
      25.00,
      0,  -- Начальное количество для нового продукта
      (SELECT id FROM categories WHERE name = 'trousers'),
      (SELECT id FROM colors WHERE name = 'beige'),
      TRUE,
      NOW(),
      NOW()
  ON CONFLICT DO NOTHING  -- Избегаем дубликатов
  RETURNING id
)
-- Вставка миниатюры для продукта
INSERT INTO thumbnail (product_id, color_id, thumbnail, created_at, updated_at)
SELECT 
    (SELECT id FROM new_product),
    (SELECT id FROM colors WHERE name = 'beige'),
    'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl/female-stone-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit',
    NOW(),
    NOW()
ON CONFLICT DO NOTHING;

-- Вставка изображений для продукта
INSERT INTO images (product_id, color_id, image, created_at, updated_at)
SELECT 
    (SELECT id FROM new_product),
    (SELECT id FROM colors WHERE name = 'beige'),
    'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl/female-stone-super-stretch-tapered-tailored-trouser',
    NOW(),
    NOW()
UNION ALL
SELECT 
    (SELECT id FROM new_product),
    (SELECT id FROM colors WHERE name = 'beige'),
    'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_1/female-stone-super-stretch-tapered-tailored-trouser',
    NOW(),
    NOW()
UNION ALL
SELECT 
    (SELECT id FROM new_product),
    (SELECT id FROM colors WHERE name = 'beige'),
    'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_2/female-stone-super-stretch-tapered-tailored-trouser',
    NOW(),
    NOW();

-- Вставка данных в product_sizes для нового продукта
INSERT INTO product_sizes (product_id, size_id, quantity, available)
SELECT 
    (SELECT id FROM new_product),
    id,
    COALESCE(
        CASE abbreviation 
            WHEN 'XS' THEN 6
            WHEN 'S' THEN 11
            WHEN 'M' THEN 3
            WHEN 'L' THEN 4
            WHEN 'XL' THEN 7
            ELSE 0 
        END, 0),
    TRUE
FROM sizes;

-- Вставка второго продукта (аналогично)
WITH new_product_blue AS (
  INSERT INTO products (title, description, price_new, price_old, quantity, category_id, color_id, available, created_at, updated_at)
  SELECT 
      'SUPER STRETCH TAPERED TAILORED TROUSER',
      'Work clothes don’t have to be boring, and these work trousers are a secure style. Slightly more formal attire, these are tailored, high waisted, and tapered at the ankle.',
      20.00,
      25.00,
      0,
      (SELECT id FROM categories WHERE name = 'trousers'),
      (SELECT id FROM colors WHERE name = 'blue'),
      TRUE,
      NOW(),
      NOW()
  ON CONFLICT DO NOTHING
  RETURNING id
)
-- Вставка миниатюры для второго продукта
INSERT INTO thumbnail (product_id, color_id, thumbnail, created_at, updated_at)
SELECT 
    (SELECT id FROM new_product_blue),
    (SELECT id FROM colors WHERE name = 'blue'),
    'https://media.boohoo.com/i/boohoo/fzz77463_navy_xl/female-navy-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit',
    NOW(),
    NOW()
ON CONFLICT DO NOTHING;

-- Вставка изображений для второго продукта
INSERT INTO images (product_id, color_id, image, created_at, updated_at)
SELECT 
    (SELECT id FROM new_product_blue),
    (SELECT id FROM colors WHERE name = 'blue'),
    'https://media.boohoo.com/i/boohoo/fzz77463_navy_xl/female-navy-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit',
    NOW(),
    NOW()
UNION ALL
SELECT 
    (SELECT id FROM new_product_blue),
    (SELECT id FROM colors WHERE name = 'blue'),
    'https://media.boohoo.com/i/boohoo/fzz77463_navy_xl_1/female-navy-super-stretch-tapered-tailored-trouser',
    NOW(),
    NOW();
