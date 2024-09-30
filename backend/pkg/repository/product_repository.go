package repository

import (
    "database/sql"
    "log"
    "api/pkg/models/product"
)

type ProductRepository interface {
    GetAll() ([]models.Product, error)
    GetByID(id int) (models.Product, error)
}

type productRepository struct {
    db *sql.DB
}

func NewProductRepository(db *sql.DB) ProductRepository {
    return &productRepository{db}
}

func (r *productRepository) GetAll() ([]models.Product, error) {
    rows, err := r.db.Query("SELECT id, title, description, price_new, price_old, quantity, available, category_id, color_id, thumbnail FROM products")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var products []models.Product
    for rows.Next() {
        var product models.Product
        if err := rows.Scan(&product.ID, &product.Title, &product.Description, &product.PriceNew, &product.PriceOld, &product.Quantity, &product.Available, &product.CategoryID, &product.ColorID, &product.Thumbnail); err != nil {
            log.Fatal(err)
        }
        products = append(products, product)
    }
    return products, nil
}

func (r *productRepository) GetByID(id int) (models.Product, error) {
    var product models.Product
    err := r.db.QueryRow("SELECT id, title, description, price_new, price_old, quantity, available, category_id, color_id, thumbnail FROM products WHERE id = $1", id).
        Scan(&product.ID, &product.Title, &product.Description, &product.PriceNew, &product.PriceOld, &product.Quantity, &product.Available, &product.CategoryID, &product.ColorID, &product.Thumbnail)
    return product, err
}
