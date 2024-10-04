INSERT INTO colors (name) 
VALUES ('beige'), ('blue'), ('black') 
ON CONFLICT (name) DO NOTHING;