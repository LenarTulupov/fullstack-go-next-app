package router

import (
    "github.com/gin-gonic/gin"
    "api/pkg/handlers"
    "api/pkg/services"
    "api/pkg/repository"
    "api/internal/middleware"
    "database/sql"
)

func SetupRouter(db *sql.DB) *gin.Engine {
    r := gin.Default()

    r.Use(middleware.CORSMiddleware())

    // Initialize the product service and repository
    productRepo := repository.NewProductRepository(db)
    productService := services.NewProductService(productRepo)
    productHandler := handlers.NewProductHandler(productService)

    // Admin 
    r.POST("/admin/login", handlers.AdminLogin)

    admin := r.Group("/admin")
    admin.Use(middleware.AuthMiddleware("admin"))
    {
        admin.GET("/dashboard", handlers.AdminDashboard)
    }

    r.POST("/register", handlers.RegisterUser)
    r.POST("/login", handlers.LoginUser)
    r.GET("/users/:id", handlers.GetUser)
    r.POST("/users", handlers.CreateUser)
    r.PUT("/users/:id", handlers.UpdateUser)
    r.DELETE("/users/:id", handlers.DeleteUser)

    r.GET("/health", handlers.HealthHandler)

    // Product routes
    r.GET("/products", productHandler.GetProducts)
    r.GET("/products/:id", productHandler.GetProduct)

    return r
}
