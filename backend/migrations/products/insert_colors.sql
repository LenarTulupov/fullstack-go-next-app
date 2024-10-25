INSERT INTO colors (name) 
VALUES ('beige'), ('blue'), ('black'), ('stone'), ('green'), ('pink'), ('white')
ON CONFLICT (name) DO NOTHING;

