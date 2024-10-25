DROP TABLE IF EXISTS product_sizes CASCADE;

CREATE TABLE IF NOT EXISTS product_sizes (
    product_id INT,
    size_id INT,
    quantity INT,
    PRIMARY KEY (product_id, size_id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (size_id) REFERENCES sizes(id)
);