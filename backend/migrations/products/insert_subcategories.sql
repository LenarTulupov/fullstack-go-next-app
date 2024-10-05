INSERT INTO subcategories (name) 
VALUES ('trousers'), ('jackets'), ('bikinis')
ON CONFLICT (name) DO NOTHING;