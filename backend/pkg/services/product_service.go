package services

import (
    "database/sql"
    "errors"
    "api/pkg/models/product"
    "api/pkg/repository"
)

type ProductService struct{}

// Получить все продукты
func (ps *ProductService) GetAllProducts(db *sql.DB) ([]models.Product, error) {
    products, err := repository.GetAllProducts(db)
    if err != nil {
        return nil, err
    }
    return products, nil
}

// Получить продукт по ID
func (ps *ProductService) GetProductDetails(db *sql.DB, productID int) (*models.Product, error) {
    product, err := repository.GetProductByID(db, productID)
    if err != nil {
        return nil, err
    }

    return product, nil
}

// Создать новый продукт
func (ps *ProductService) CreateProduct(db *sql.DB, product *models.Product) error {
    // Дополнительная валидация или обработка бизнес-логики перед созданием продукта
    if product.Quantity < 0 {
        return errors.New("quantity cannot be negative")
    }

    err := repository.CreateProduct(db, product)
    if err != nil {
        return err
    }

    return nil
}
