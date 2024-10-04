INSERT INTO colors (name) 
VALUES ('beige'), ('blue'), ('black') 
ON CONFLICT (name) DO NOTHING;

INSERT INTO colors (name) 
VALUES ('stone') 
ON CONFLICT (name) DO NOTHING;