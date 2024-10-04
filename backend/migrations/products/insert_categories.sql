INSERT INTO categories (name) 
VALUES ('new'), ('summer'), ('trends'), ('dresses'), ('trousers') 
ON CONFLICT (name) DO NOTHING;