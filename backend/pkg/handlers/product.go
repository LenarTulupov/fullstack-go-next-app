package handlers

import (
    "net/http"
    "strconv"
    "api/pkg/models/product"
    "api/pkg/config"
    "api/pkg/repository"
    "api/pkg/services"
    "github.com/gin-gonic/gin"
)

var productService = services.ProductService{}

func GetAllProducts(c *gin.Context) {
    products, err := repository.GetAllProducts(config.DB)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch products"})
        return
    }
    c.JSON(http.StatusOK, products)
}

func GetProduct(c *gin.Context) {
    productID := c.Param("id")
    id, err := strconv.Atoi(productID)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
        return
    }

    product, err := productService.GetProduct(id)
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
