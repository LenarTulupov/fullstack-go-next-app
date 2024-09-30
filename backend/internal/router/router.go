package router

import (
    "github.com/gin-gonic/gin"
    "api/pkg/handlers"
    "api/internal/middleware"
    "api/pkg/repository"  // Импортируем пакет репозитория
    "api/pkg/services"     // Импортируем пакет сервисов
    "database/sql"         // Импортируем пакет для работы с БД
)

func SetupRouter(db *sql.DB) *gin.Engine {
    r := gin.Default()

    r.Use(middleware.CORSMiddleware())

    // Создание экземпляра репозитория и сервиса
    productRepo := repository.NewProductRepository(db)
    productService := services.NewProductService(productRepo)

    r.POST("/register", handlers.RegisterUser)
    r.POST("/login", handlers.LoginUser)
    r.GET("/users/:id", handlers.GetUser)
    r.POST("/users", handlers.CreateUser)
    r.PUT("/users/:id", handlers.UpdateUser)
    r.DELETE("/users/:id", handlers.DeleteUser)

    r.GET("/health", handlers.HealthHandler)

    // Регистрация обработчиков продуктов
    productHandler := handlers.NewProductHandler(productService)
    r.GET("/products", productHandler.GetProducts)
    r.GET("/products/:id", productHandler.GetProduct)

    return r
}
