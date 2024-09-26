-- Вставка данных в таблицу categories
WITH inserted_category AS (
  INSERT INTO categories (name, created_at, updated_at)
  VALUES ('trousers', NOW(), NOW())
  RETURNING id
),
inserted_color AS (
  INSERT INTO colors (name, created_at, updated_at)
  VALUES ('beige', NOW(), NOW())
  RETURNING id
),
inserted_product AS (
  INSERT INTO products (title, description, price_new, price_old, quantity, available, created_at, updated_at)
  VALUES (
    'SUPER STRETCH TAPERED TAILORED TROUSER',
    'Рабочая одежда не должна быть скучной, и эти рабочие брюки — безопасный выбор стиля. Немного более формальная одежда, эти брюки с высокой талией и зауженные к низу. Выбирайте между пуговицей или молнией, эти элегантные брюки нарядны и остры как бритва, внушая серьезное отношение. Всегда практичный элемент гардероба, наденьте их и готовьтесь произвести впечатление в любом профессиональном сценарии или ситуации.',
    20.00,
    25.00,
    10,
    TRUE,
    NOW(),
    NOW()
  )
  RETURNING id
)
INSERT INTO thumbnail (product_id, color_id, thumbnail, created_at, updated_at)
SELECT (SELECT id FROM inserted_product), (SELECT id FROM inserted_color), 
       'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl/female-stone-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 
       NOW(), 
       NOW();

-- Вставка данных в таблицу images
INSERT INTO images (product_id, color_id, image, created_at, updated_at)
SELECT (SELECT id FROM inserted_product), (SELECT id FROM inserted_color), 
       'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl/female-stone-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 
       NOW(), 
       NOW()
UNION ALL
SELECT (SELECT id FROM inserted_product), (SELECT id FROM inserted_color), 
       'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_1/female-stone-super-stretch-tapered-tailored-trouser', 
       NOW(), 
       NOW()
UNION ALL
SELECT (SELECT id FROM inserted_product), (SELECT id FROM inserted_color), 
       'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_2/female-stone-super-stretch-tapered-tailored-trouser', 
       NOW(), 
       NOW()
UNION ALL
SELECT (SELECT id FROM inserted_product), (SELECT id FROM inserted_color), 
       'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_3/female-stone-super-stretch-tapered-tailored-trouser', 
       NOW(), 
       NOW();

-- Вставка данных в таблицу sizes
WITH inserted_sizes AS (
  INSERT INTO sizes (name, abbreviation, created_at, updated_at)
  VALUES 
  ('xs', 'XS', NOW(), NOW()),
  ('s', 'S', NOW(), NOW()),
  ('m', 'M', NOW(), NOW()),
  ('l', 'L', NOW(), NOW()),
  ('xl', 'XL', NOW(), NOW())
  RETURNING id
)
-- Вставка данных в таблицу product_sizes
INSERT INTO product_sizes (product_id, size_id)
SELECT (SELECT id FROM inserted_product), id 
FROM inserted_sizes;
