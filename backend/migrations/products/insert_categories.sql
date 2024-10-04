INSERT INTO categories (name) 
VALUES ('new'), ('summer'), ('trends'), ('dresses')
ON CONFLICT (name) DO NOTHING;