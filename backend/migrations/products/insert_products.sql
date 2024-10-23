ALTER TABLE products ADD CONSTRAINT unique_title_color UNIQUE (title, color_id);
ALTER TABLE images ADD CONSTRAINT unique_image_url_product UNIQUE (image_url, product_id);
ALTER TABLE products ADD CONSTRAINT fk_subcategory FOREIGN KEY (subcategory_id) REFERENCES subcategories(id);

-- Вставка продуктов
INSERT INTO products (
  title, 
  description, 
  price_new, 
  price_old, 
  quantity, 
  available, 
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
  subcategory_id,
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
  2,
  4, 
  NULL 
)
ON CONFLICT (title, color_id) DO NOTHING;

INSERT INTO product_categories (product_id, category_id) 
VALUES (4, 3);

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

-- Fifth product

INSERT INTO products (
  title, 
  description, 
  price_new, 
  price_old, 
  quantity, 
  available, 
  subcategory_id,
  color_id, 
  thumbnail
)
VALUES 
(
  'SHIRRED TRIANGLE BIKINI TOP',
  'You`ll have all eyes on you this summer in this triangle bikini. Getting its name from the two triangle-shaped pieces of fabric that form each cup, this style is a classic silhouette that`s flattering for all sizes. Look on point in knot-tie triangle bikini tops or bring the heat in a mesh detail styles. This one would look fire with matching bottoms, fine gold jewellery, heeled wedges and an oversized beach bag. It`s poolside glam that you`ll never want to take off.',
  3.00, 
  12.00,
  0,
  FALSE,
  3,
  5, 
  NULL 
)
ON CONFLICT (title, color_id) DO NOTHING;

INSERT INTO product_categories (product_id, category_id) 
VALUES (5, 2), (5, 3);

INSERT INTO images (image_url, product_id) VALUES
('https://media.boohoo.com/i/boohoo/gzz02901_green_xl/female-green-shirred-triangle-bikini-top-?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 5),
('https://media.boohoo.com/i/boohoo/gzz02901_green_xl_1/female-shirred-triangle-bikini-top-?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 5),
('https://media.boohoo.com/i/boohoo/gzz02901_green_xl_2/female-shirred-triangle-bikini-top-?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 5),
('https://media.boohoo.com/i/boohoo/gzz02901_green_xl_3/female-shirred-triangle-bikini-top-?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 5)
ON CONFLICT (image_url, product_id) DO NOTHING; 

UPDATE products SET thumbnail = (SELECT image_url FROM images WHERE product_id = 5 LIMIT 1) WHERE id = 5;

INSERT INTO product_sizes (product_id, size_id, quantity) VALUES
(5, 1, 17), 
(5, 2, 19), 
(5, 3, 45), 
(5, 4, 20), 
(5, 5, 11), 
(5, 6, 9)
ON CONFLICT (product_id, size_id) DO NOTHING;  

-- Sixth product

INSERT INTO products (
  title, 
  description, 
  price_new, 
  price_old, 
  quantity, 
  available, 
  subcategory_id,
  color_id, 
  thumbnail
)
VALUES 
(
  '3 PACK LEOPARD PAISLEY TIE BIKINI KIMONO SET',
  'Protect your skin from the sun with this beach cover up from our latest beachwear collection. Designed to keep your skin out of the sun on those super hot beach days, our cover ups for the beach strike the perfect balance between practicality and style. Need style inspo? Team with a matching bikini and sandals for beach club plans. Golden hour awaits...just add a beach bag and sunglasses and you`re good to go!',
  33.50, 
  35.00,
  0,
  FALSE,
  3,
  6, 
  NULL 
)
ON CONFLICT (title, color_id) DO NOTHING;

INSERT INTO product_categories (product_id, category_id) 
VALUES (6, 2), (6, 3);

INSERT INTO images (image_url, product_id) VALUES
('https://media.boohoo.com/i/boohoo/gzz19581_pink_xl/female-pink-3-pack-leopard-paisley-tie-bikini-kimono-set?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 6),
('https://media.boohoo.com/i/boohoo/gzz19581_pink_xl_1/female-pink-3-pack-leopard-paisley-tie-bikini-kimono-set?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 6),
('https://media.boohoo.com/i/boohoo/gzz19581_pink_xl_2/female-pink-3-pack-leopard-paisley-tie-bikini-kimono-set?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 6),
('https://media.boohoo.com/i/boohoo/gzz19581_pink_xl_3/female-pink-3-pack-leopard-paisley-tie-bikini-kimono-set?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 6)
ON CONFLICT (image_url, product_id) DO NOTHING; 

UPDATE products SET thumbnail = (SELECT image_url FROM images WHERE product_id = 6 LIMIT 1) WHERE id = 6;

INSERT INTO product_sizes (product_id, size_id, quantity) VALUES
(6, 1, 3), 
(6, 2, 2), 
(6, 3, 0), 
(6, 4, 0), 
(6, 5, 1), 
(6, 6, 9)
ON CONFLICT (product_id, size_id) DO NOTHING;  

-- Seventh product

INSERT INTO products (
  title, 
  description, 
  price_new, 
  price_old, 
  quantity, 
  available, 
  color_id, 
  thumbnail
)
VALUES 
(
  'DEEP V NECK MINI DRESS',
  'Looking for the perfect casual dress to wear every day? This on-trend piece from our day dresses collection is just for you. A day dress is your go-to style for versatility and easy wearing, just pair it with trainers to achieve the perfect casual look. With its relaxed silhouette and floaty style, day dresses mean you stay comfortable all day, no matter what your plans.',
  25.20, 
  28.00,
  0,
  FALSE,
  7, 
  NULL 
)
ON CONFLICT (title, color_id) DO NOTHING;

INSERT INTO product_categories (product_id, category_id) 
VALUES (7, 2), (7, 3), (7, 4);

INSERT INTO images (image_url, product_id) VALUES
('https://media.boohoo.com/i/boohoo/gzz97114_white_xl/female-white-deep-v-neck-mini-dress?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 7),
('https://media.boohoo.com/i/boohoo/gzz97114_white_xl_1/female-white-deep-v-neck-mini-dress?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 7),
('https://media.boohoo.com/i/boohoo/gzz97114_white_xl_2/female-white-deep-v-neck-mini-dress?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 7),
('https://media.boohoo.com/i/boohoo/gzz97114_white_xl_3/female-white-deep-v-neck-mini-dress?w=675&qlt=default&fmt.jp2.qlt=70&fmt=auto&sm=fit', 7)
ON CONFLICT (image_url, product_id) DO NOTHING; 

UPDATE products SET thumbnail = (SELECT image_url FROM images WHERE product_id = 7 LIMIT 1) WHERE id = 7;

INSERT INTO product_sizes (product_id, size_id, quantity) VALUES
(7, 1, 0), 
(7, 2, 2), 
(7, 3, 1), 
(7, 4, 5), 
(7, 5, 0), 
(7, 6, 1)
ON CONFLICT (product_id, size_id) DO NOTHING;  