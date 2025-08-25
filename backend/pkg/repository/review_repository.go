package repository

import (
    "api/pkg/models/product"
    "database/sql"
)

type ReviewRepository interface {
    GetByProductID(productID int) ([]models.Review, error)
    Create(review models.Review) (models.Review, error)
}

type reviewRepo struct {
    db *sql.DB
}

func NewReviewRepository(db *sql.DB) ReviewRepository {
    return &reviewRepo{db}
}

func (r *reviewRepo) GetByProductID(productID int) ([]models.Review, error) {
    // Пока простой пример — возвращаем пустой слайс
    return []models.Review{}, nil
}

func (r *reviewRepo) Create(review models.Review) (models.Review, error) {
    // Пока простой пример — возвращаем review как есть
    return review, nil
}
