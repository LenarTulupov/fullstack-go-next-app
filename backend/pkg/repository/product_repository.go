package repository

import (
	"database/sql"
	"log"
	"api/pkg/models"
)

func InsertProduct(db *sql.DB, product *models.Product) error {
	query := `
		INSERT INTO products (title, subtitle, description, price_new, price_old, quantity, category_id, available, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
		RETURNING id`
	
	err := db.QueryRow(query, product.Title, product.Subtitle, product.Description, product.PriceNew, product.PriceOld, product.Quantity, product.CategoryID, product.Available).Scan(&product.ID)
	if err != nil {
		log.Println("Error inserting product:", err)
		return err
	}

	return nil
}