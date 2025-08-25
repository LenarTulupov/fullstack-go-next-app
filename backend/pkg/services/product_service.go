package services

import (
	"api/pkg/models/product"
	"api/pkg/repository"
	"errors"
)

var ErrProductNotFound = errors.New("product not found")

type ProductService interface {
	GetAllProducts() ([]models.Product, error)
	GetProductByID(id int) (models.Product, error)
	GetProductBySlug(slug string) (models.Product, error)
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
		return product, ErrProductNotFound
	}
	return product, nil
}

func (s *productService) GetProductBySlug(slug string) (models.Product, error) {
	product, err := s.repo.GetBySlug(slug)
	if err != nil {
		return product, ErrProductNotFound
	}
	return product, nil
}
