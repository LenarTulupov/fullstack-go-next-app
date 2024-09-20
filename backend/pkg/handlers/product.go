package handlers

import (
    "net/http"
    "strconv"
    "api/pkg/repository"
    "api/pkg/models"
    "api/pkg/config"
    "github.com/gin-gonic/gin"
)

func GetProduct(c *gin.Context) {
    productID := c.Param("id")
    id, err := strconv.Atoi(productID)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
        return
    }

    product, err := repository.GetProductByID(config.DB, id)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
        return
    }
    c.JSON(http.StatusOK, product)
}

func CreateProduct(c *gin.Context) {
    var product models.Product
    if err := c.ShouldBindJSON(&product); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    if err := repository.InsertProduct(config.DB, &product); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, product)
}
