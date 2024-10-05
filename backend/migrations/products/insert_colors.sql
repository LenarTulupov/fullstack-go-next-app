INSERT INTO colors (name) 
VALUES ('beige'), ('blue'), ('black'), ('stone'), ('green') 
ON CONFLICT (name) DO NOTHING;

