package services

import (
    "api/pkg/models/product"
    "api/pkg/repository"
)

type ProductService interface {
    GetAllProducts() ([]models.Product, error)
    GetProductByID(id int) (models.Product, error)
}

type productService struct {
    repo repository.ProductRepository
}

func NewProductService(repo repository.ProductRepository) ProductService {
    return &productService{repo}
}

func (s *productService) GetAllProducts() ([]models.Product, error) {
    return s.repo.GetAll()
}

func (s *productService) GetProductByID(id int) (models.Product, error) {
    return s.repo.GetByID(id)
}
