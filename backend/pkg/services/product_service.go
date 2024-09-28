package services

import (
    "api/pkg/models/product"
    "api/pkg/repository"
    "database/sql"
)

type ProductService struct{}

func (p *ProductService) GetAllProducts(db *sql.DB) ([]models.Product, error) {
    return repository.GetAllProducts(db)
}

func (p *ProductService) GetProductDetails(db *sql.DB, productID int) (*models.Product, error) {
    return repository.GetProductByID(db, productID)
}

func (p *ProductService) CreateProduct(db *sql.DB, product *models.Product) error {
    return repository.CreateProduct(db, product)
}
