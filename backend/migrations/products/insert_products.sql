ALTER TABLE products ADD CONSTRAINT unique_title_color UNIQUE (title, color_id);
ALTER TABLE images ADD CONSTRAINT unique_image_url_product UNIQUE (image_url, product_id);
ALTER TABLE products ADD COLUMN subcategory_id INT;
ALTER TABLE products ADD CONSTRAINT fk_subcategory FOREIGN KEY (subcategory_id) REFERENCES subcategories(id);

-- Вставка продуктов
INSERT INTO products (
  title, 
  description, 
  price_new, 
  price_old, 
  quantity, 
  available, 
  category_id, 
  subcategory_id,
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
  NULL, -- Это ID категории '...'
  1,
  1, 
  NULL -- Временно NULL, мы обновим позже
),
(
  'SUPER STRETCH TAPERED TAILORED TROUSER',
  'Work clothes don’t have to be boring, and these work trousers are a secure style. Slightly more formal attire, these are tailored, high waisted, and tapered at the ankle. Choose between button or zip-up detail, these are smart pants that are sharply tailored, serving some serious attitude. Always a practical piece to have in your wardrobe, throw these on and prepare to impress in any professional setting or scenario.',
  20.00, 
  25.00,
  0,
  FALSE,
  NULL, -- Это также ID категории 'trousers'
  1,
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

-- Третий продукта
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
  NULL,
  1,
  3, 
  NULL 
)
ON CONFLICT (title, color_id) DO NOTHING;

INSERT INTO images (image_url, product_id) VALUES
('https://media.boohoo.com/i/boohoo/fzz77463_black_xl/female-black-super-stretch-tapered-tailored-trouser/?w=900&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 3),
('https://media.boohoo.com/i/boohoo/fzz77463_black_xl_1/female-black-super-stretch-tapered-tailored-trouser', 3),
('https://media.boohoo.com/i/boohoo/fzz77463_black_xl_2/female-black-super-stretch-tapered-tailored-trouser', 3),
('https://media.boohoo.com/i/boohoo/fzz77463_black_xl_3/female-black-super-stretch-tapered-tailored-trouser', 3)
ON CONFLICT (image_url, product_id) DO NOTHING; 

UPDATE products SET thumbnail = (SELECT image_url FROM images WHERE product_id = 3 LIMIT 1) WHERE id = 3;

INSERT INTO product_sizes (product_id, size_id, quantity) VALUES
(3, 1, 7), 
(3, 2, 4), 
(3, 3, 0), 
(3, 4, 0), 
(3, 5, 1), 
(3, 6, 0)
ON CONFLICT (product_id, size_id) DO NOTHING;  

-- Forth product

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
  'BUTTON UP FESTIVAL MAC',
  'Got a festival coming up? Practical, statement making, and perfect for dancing in, be prepared to take on whatever the weather decides to throw at you with our festival jackets. Get your rave on in a waterproof festival rain mac or bomber, or switch it up for a festival parka with a tassel trim, or a shredded denim jacket with floral embroidery.',
  19.80, 
  22.00,
  0,
  FALSE,
  3,
  2,
  4, 
  NULL 
)
ON CONFLICT (title, color_id) DO NOTHING;

INSERT INTO images (image_url, product_id) VALUES
('https://media.boohoo.com/i/boohoo/gzz91994_stone_xl/female-stone-button-up-festival-mac-?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 4),
('https://media.boohoo.com/i/boohoo/gzz91994_stone_xl_1/female-stone-button-up-festival-mac-?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 4),
('https://media.boohoo.com/i/boohoo/gzz91994_stone_xl_2/female-stone-button-up-festival-mac-?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 4),
('https://media.boohoo.com/i/boohoo/gzz91994_stone_xl_3/female-stone-button-up-festival-mac-?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 4)
ON CONFLICT (image_url, product_id) DO NOTHING; 

UPDATE products SET thumbnail = (SELECT image_url FROM images WHERE product_id = 4 LIMIT 1) WHERE id = 4;

INSERT INTO product_sizes (product_id, size_id, quantity) VALUES
(4, 1, 2), 
(4, 2, 1), 
(4, 3, 3), 
(4, 4, 2), 
(4, 5, 4), 
(4, 6, 8)
ON CONFLICT (product_id, size_id) DO NOTHING;  