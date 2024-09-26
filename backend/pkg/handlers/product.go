package handlers

import (
    "net/http"
    "strconv"
    "api/pkg/config"
    "api/pkg/services"
    "api/pkg/models/product"
    "github.com/gin-gonic/gin"
    "encoding/json"
    "time"
)

var productService = services.ProductService{}

func GetAllProducts(c *gin.Context) {
    products, err := productService.GetAllProducts(config.DB)
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

    product, err := productService.GetProductDetails(config.DB, id)
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

    if err := productService.CreateProduct(config.DB, &product); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, product)
}

func AddProduct(w http.ResponseWriter, r *http.Request) {
    var product models.Product

    // Декодируем JSON-данные из запроса
    if err := json.NewDecoder(r.Body).Decode(&product); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Устанавливаем временные метки
    product.CreatedAt = time.Now()
    product.UpdatedAt = time.Now()

    // SQL-запрос для вставки продукта
    query := `
        INSERT INTO products (title, subtitle, description, price_new, price_old, quantity, available, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id
    `

    var id int
    err := config.DB.QueryRow(query, product.Title, product.Subtitle, product.Description, product.PriceNew, product.PriceOld, product.Quantity, product.Available, product.CreatedAt, product.UpdatedAt).Scan(&id)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    // Возвращаем ID нового продукта
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]int{"id": id})
}
