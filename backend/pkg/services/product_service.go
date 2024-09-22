package services

import (
    "api/pkg/models"
    "api/pkg/repository"
    "api/pkg/config" 
)

type ProductService struct {}

func (s *ProductService) GetProduct(productID int) (*models.Product, error) {
    return repository.GetProductWithDetails(config.DB, productID) 
}

func FetchProductDetails(productID int) (*models.Product, error) {
    product, err := repository.GetProductWithDetails(config.DB, productID)
    if err != nil {
        return nil, err
    }
    return product, nil
}
