package services

import (
    "errors"
    "api/pkg/models/product"
    "api/pkg/repository"
)

var ErrProductNotFound = errors.New("product not found")

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
    product, err := s.repo.GetByID(id)
    if err != nil {
        // Предположим, что если ошибка не nil, это означает, что продукт не найден
        return product, ErrProductNotFound
    }
    return product, nil
}
