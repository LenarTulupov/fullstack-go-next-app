-- Вставка данных в таблицу products
INSERT INTO products (id, title, subtitle, description, price_new, price_old, quantity, available, created_at, updated_at)
VALUES (
  1,
  'SUPER STRETCH TAPERED TAILORED TROUSER',
  NULL,
  'Рабочая одежда не должна быть скучной, и эти рабочие брюки — безопасный выбор стиля. Немного более формальная одежда, эти брюки с высокой талией и зауженные к низу...',
  20.00,
  25.00,
  10,
  TRUE,
  NOW(),
  NOW()
);

-- Вставка данных в таблицу categories
INSERT INTO categories (id, name, created_at, updated_at)
VALUES (4, 'trousers', NOW(), NOW());

-- Вставка данных в таблицу colors
INSERT INTO colors (id, name, created_at, updated_at)
VALUES (2, 'beige', NOW(), NOW());

-- Вставка данных в таблицу product_colors
INSERT INTO product_colors (product_id, color_id, image, created_at, updated_at)
VALUES 
(1, 2, NULL, NOW(), NOW());  -- image оставлено NULL, можно добавить позже

-- Вставка данных в таблицу product_color_images
INSERT INTO product_thumbnails (product_id, color_id, thumbnail, created_at, updated_at)
VALUES 
(1, 2, 'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl/female-stone-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', NOW(), NOW()),
(1, 2, 'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_1/female-stone-super-stretch-tapered-tailored-trouser', NOW(), NOW()),
(1, 2, 'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_2/female-stone-super-stretch-tapered-tailored-trouser', NOW(), NOW()),
(1, 2, 'https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_3/female-stone-super-stretch-tapered-tailored-trouser', NOW(), NOW());

-- Вставка данных в таблицу sizes
INSERT INTO sizes (id, name, abbreviation, description, created_at, updated_at)
VALUES 
(1, 'xs', 'XS', 'Extra Small', NOW(), NOW()),
(2, 's', 'S', 'Small', NOW(), NOW()),
(3, 'm', 'M', 'Medium', NOW(), NOW()),
(4, 'l', 'L', 'Large', NOW(), NOW()),
(5, 'xl', 'XL', 'Extra Large', NOW(), NOW());

-- Вставка данных в таблицу product_sizes
INSERT INTO product_sizes (product_id, size_id)
VALUES 
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5);
