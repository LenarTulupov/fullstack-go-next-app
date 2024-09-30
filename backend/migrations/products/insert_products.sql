-- Вставка категорий
INSERT INTO categories (name) VALUES ('new'), ('summer'), ('trends'), ('dresses'), ('trousers');

-- Вставка цветов
INSERT INTO colors (name) VALUES ('beige'), ('blue'), ('black');

-- Вставка продуктов
INSERT INTO products (
  title, 
  description, 
  price_new, 
  price_old, 
  quantity, 
  available, 
  category_id, 
  color_id, 
  thumbnail
)
VALUES 
(
  'SUPER STRETCH TAPERED TAILORED TROUSER',
  'Work clothes don’t have to be boring, and these work trousers are a secure style. Slightly more formal attire, these are tailored, high waisted, and tapered at the ankle. Choose between button or zip-up detail, these are smart pants that are sharply tailored, serving some serious attitude. Always a practical piece to have in your wardrobe, throw these on and prepare to impress in any professional setting or scenario.',
  20.00, 
  25.00,
  0,
  FALSE,
  5, -- Это ID категории 'trousers'
  1, 
  NULL -- Временно NULL, мы обновим позже
),
(
  'SUPER STRETCH TAPERED TAILORED TROUSER - NAVY',
  'Another color option for the SUPER STRETCH TAPERED TAILORED TROUSER, offering the same fit and style.',
  20.00, 
  25.00,
  0,
  FALSE,
  5, -- Это также ID категории 'trousers'
  2, 
  NULL -- Временно NULL, мы обновим позже
);

-- Вставка размеров для первого продукта
INSERT INTO sizes (name, abbreviation, description, quantity, available) VALUES
('xs', 'XS', 'Extra Small', 5, TRUE),
('s', 'S', 'Small', 1, TRUE),
('m', 'M', 'Medium', 0, FALSE),
('l', 'L', 'Large', 3, TRUE),
('xl', 'XL', 'Extra Large', 2, TRUE),
('xxl', 'XXL', 'Extra Extra Large', 0, FALSE);

-- Вставка размеров для второго продукта
INSERT INTO sizes (name, abbreviation, description, quantity, available) VALUES
('xs', 'XS', 'Extra Small', 2, TRUE),
('s', 'S', 'Small', 3, TRUE),
('m', 'M', 'Medium', 10, TRUE),
('l', 'L', 'Large', 0, FALSE),
('xl', 'XL', 'Extra Large', 0, FALSE),
('xxl', 'XXL', 'Extra Extra Large', 0, FALSE);

-- Вставка изображений для первого продукта
INSERT INTO images (image_url, product_id) VALUES
('https://media.boohoo.com/i/boohoo/fzz77463_stone_xl/female-stone-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 1),
('https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_1/female-stone-super-stretch-tapered-tailored-trouser', 1),
('https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_2/female-stone-super-stretch-tapered-tailored-trouser', 1),
('https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_3/female-stone-super-stretch-tapered-tailored-trouser', 1);

-- Вставка изображений для второго продукта
INSERT INTO images (image_url, product_id) VALUES
('https://media.boohoo.com/i/boohoo/fzz77463_navy_xl/female-navy-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 2),
('https://media.boohoo.com/i/boohoo/fzz77463_navy_xl_1/female-navy-super-stretch-tapered-tailored-trouser', 2),
('https://media.boohoo.com/i/boohoo/fzz77463_navy_xl_2/female-navy-super-stretch-tapered-tailored-trouser', 2),
('https://media.boohoo.com/i/boohoo/fzz77463_navy_xl_3/female-navy-super-stretch-tapered-tailored-trouser', 2);

-- Обновление thumbnail для продуктов
UPDATE products SET thumbnail = (SELECT image_url FROM images WHERE product_id = 1 LIMIT 1) WHERE id = 1;
UPDATE products SET thumbnail = (SELECT image_url FROM images WHERE product_id = 2 LIMIT 1) WHERE id = 2;

INSERT INTO product_sizes (product_id, size_id, quantity) VALUES
(1, 1, 5), -- Размер XS для первого продукта
(1, 2, 1), -- Размер S для первого продукта
(1, 4, 3), -- Размер L для первого продукта
(1, 5, 2), -- Размер XL для первого продукта
(2, 1, 2), -- Размер XS для второго продукта
(2, 2, 3), -- Размер S для второго продукта
(2, 3, 10); -- Размер M для второго продукта