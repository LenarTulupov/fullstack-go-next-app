INSERT INTO subcategories (name) 
VALUES ('trousers'), ('jackets') 
ON CONFLICT (name) DO NOTHING;