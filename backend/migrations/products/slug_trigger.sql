CREATE OR REPLACE FUNCTION generate_product_slug()
RETURNS TRIGGER AS $$
DECLARE
    base_slug TEXT;
    new_slug TEXT;
    counter INT := 1;
BEGIN
    base_slug := LOWER(REPLACE(NEW.title, ' ', '-'));
    new_slug := base_slug;

    WHILE EXISTS (SELECT 1 FROM products WHERE slug = new_slug) LOOP
        new_slug := base_slug || '-' || counter;
        counter := counter + 1;
    END LOOP;

    NEW.slug := new_slug;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_generate_slug
BEFORE INSERT ON products
FOR EACH ROW
EXECUTE FUNCTION generate_product_slug();