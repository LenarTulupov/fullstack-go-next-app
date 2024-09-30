package handlers

import (
    "net/http"
    "api/pkg/services"
    "github.com/gin-gonic/gin"
    "strconv"
)

type ProductHandler struct {
    service services.ProductService
}

func NewProductHandler(service services.ProductService) *ProductHandler {
    return &ProductHandler{service}
}

func (h *ProductHandler) GetProducts(c *gin.Context) {
    products, err := h.service.GetAllProducts()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, products) // Отправка успешного ответа с продуктами
}

func (h *ProductHandler) GetProduct(c *gin.Context) {
    idStr := c.Param("id") // Извлечение ID из маршрута
    id, err := strconv.Atoi(idStr) // Конвертация ID в целое число
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid product ID"})
        return
    }

    product, err := h.service.GetProductByID(id) // Получаем продукт по ID
    if err != nil {
        if err == services.ErrProductNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        }
        return
    }

    c.JSON(http.StatusOK, product) // Отправка успешного ответа с продуктом
}
