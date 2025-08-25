package services

import (
    "api/pkg/models/product"
    "api/pkg/repository"
    "errors"
)

var ErrReviewNotFound = errors.New("review not found")

type ReviewService interface {
    GetReviewsByProductID(productID int) ([]models.Review, error)
    AddReview(review models.Review) (models.Review, error)
}

type reviewService struct {
    repo repository.ReviewRepository
}

func NewReviewService(repo repository.ReviewRepository) ReviewService {
    return &reviewService{repo}
}

func (s *reviewService) GetReviewsByProductID(productID int) ([]models.Review, error) {
    return s.repo.GetByProductID(productID)
}

func (s *reviewService) AddReview(review models.Review) (models.Review, error) {
    return s.repo.Create(review)
}
