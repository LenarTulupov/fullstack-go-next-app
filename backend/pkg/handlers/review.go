// pkg/handlers/review.go
package handlers

import (
    "api/pkg/services"
    "github.com/gin-gonic/gin"
    "net/http"
    "strconv"
)

type ReviewHandler struct {
    service services.ReviewService
}

func NewReviewHandler(service services.ReviewService) *ReviewHandler {
    return &ReviewHandler{service}
}

func (h *ReviewHandler) GetReviews(c *gin.Context) {
    productIDStr := c.Param("productID")
    productID, err := strconv.Atoi(productIDStr)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
        return
    }

    reviews, err := h.service.GetReviewsByProductID(productID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, reviews)
}

func (h *ReviewHandler) AddReview(c *gin.Context) {
    productIDStr := c.Param("productID")
    productID, err := strconv.Atoi(productIDStr)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
        return
    }

    var review models.Review
    if err := c.ShouldBindJSON(&review); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    review.ProductID = productID

    createdReview, err := h.service.AddReview(review)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, createdReview)
}
