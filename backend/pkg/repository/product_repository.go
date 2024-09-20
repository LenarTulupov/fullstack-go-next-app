package repository

import (
    "database/sql"
    "api/pkg/models"
)

func GetProductByID(db *sql.DB, id int) (*models.Product, error) {
    query := `SELECT id, title, subtitle, description, price_new, price_old, quantity, category_id, available, created_at, updated_at
              FROM products WHERE id = $1`
    product := &models.Product{}
    
    err := db.QueryRow(query, id).Scan(
        &product.ID,
        &product.Title,
        &product.Subtitle,
        &product.Description,
        &product.PriceNew,
        &product.PriceOld,
        &product.Quantity,
        &product.CategoryID,
        &product.Available,
        &product.CreatedAt,
        &product.UpdatedAt,
    )
    if err != nil {
        return nil, err
    }
    return product, nil
}

func InsertProduct(db *sql.DB, product *models.Product) error {
    query := `
        INSERT INTO products (title, subtitle, description, price_new, price_old, quantity, category_id, available, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
        RETURNING id`
    
    err := db.QueryRow(query, product.Title, product.Subtitle, product.Description, product.PriceNew, product.PriceOld, product.Quantity, product.CategoryID, product.Available).Scan(&product.ID)
    if err != nil {
        return err
    }

    return nil
}
