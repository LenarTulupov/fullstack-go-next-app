INSERT INTO colors (name) 
VALUES ('beige'), ('blue'), ('black'), ('stone'), ('green'), ('pink') 
ON CONFLICT (name) DO NOTHING;

