-- Вставка категорий
INSERT INTO categories (name) 
VALUES ('new'), ('summer'), ('trends'), ('dresses'), ('trousers') 
ON CONFLICT (name) DO NOTHING;

-- Вставка цветов
INSERT INTO colors (name) 
VALUES ('beige'), ('blue'), ('black') 
ON CONFLICT (name) DO NOTHING;

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
  'SUPER STRETCH TAPERED TAILORED TROUSER',
  'Another color option for the SUPER STRETCH TAPERED TAILORED TROUSER, offering the same fit and style.',
  20.00, 
  25.00,
  0,
  FALSE,
  5, -- Это также ID категории 'trousers'
  2, 
  NULL -- Временно NULL, мы обновим позже
)
ON CONFLICT (title, color_id) DO NOTHING;

-- Вставка изображений для первого продукта
INSERT INTO images (image_url, product_id) VALUES
('https://media.boohoo.com/i/boohoo/fzz77463_stone_xl/female-stone-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 1),
('https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_1/female-stone-super-stretch-tapered-tailored-trouser', 1),
('https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_2/female-stone-super-stretch-tapered-tailored-trouser', 1),
('https://media.boohoo.com/i/boohoo/fzz77463_stone_xl_3/female-stone-super-stretch-tapered-tailored-trouser', 1)
ON CONFLICT (image_url, product_id) DO NOTHING; 

-- Вставка изображений для второго продукта
INSERT INTO images (image_url, product_id) VALUES
('https://media.boohoo.com/i/boohoo/fzz77463_navy_xl/female-navy-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 2),
('https://media.boohoo.com/i/boohoo/fzz77463_navy_xl_1/female-navy-super-stretch-tapered-tailored-trouser', 2),
('https://media.boohoo.com/i/boohoo/fzz77463_navy_xl_2/female-navy-super-stretch-tapered-tailored-trouser', 2),
('https://media.boohoo.com/i/boohoo/fzz77463_navy_xl_3/female-navy-super-stretch-tapered-tailored-trouser', 2)
ON CONFLICT (image_url, product_id) DO NOTHING; 

-- Обновление thumbnail для продуктов
UPDATE products SET thumbnail = (SELECT image_url FROM images WHERE product_id = 1 LIMIT 1) WHERE id = 1;
UPDATE products SET thumbnail = (SELECT image_url FROM images WHERE product_id = 2 LIMIT 1) WHERE id = 2;

INSERT INTO product_sizes (product_id, size_id, quantity) VALUES
(1, 1, 5), 
(1, 2, 1), 
(1, 3, 0), 
(1, 4, 3), 
(1, 5, 2), 
(1, 6, 0), 
-- Размеры второго продукта
(2, 1, 2),
(2, 2, 3), 
(2, 3, 10),
(2, 4, 0), 
(2, 5, 0),
(2, 6, 0)
ON CONFLICT (product_id, size_id) DO NOTHING; 
