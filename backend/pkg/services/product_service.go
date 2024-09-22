package services

import (
    "api/pkg/models"
    "api/pkg/repository"
)

type ProductService struct {
    Repo *repository.ProductRepository
}

func (s *ProductService) GetProduct(productID int) (models.Product, error) {
    return s.Repo.GetProductByID(productID)
}