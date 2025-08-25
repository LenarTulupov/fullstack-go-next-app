package router

import (
    "database/sql"
    "net/http"

    "api/internal/middleware"
    "api/pkg/config"
    "api/pkg/handlers"
    "api/pkg/repository"
    "api/pkg/services"
    "github.com/gin-gonic/gin"
)

func SetupRouter(db *sql.DB) *gin.Engine {
    r := gin.Default()

    // Применяем CORS middleware глобально
    r.Use(middleware.CORSMiddleware())

    // Инициализация product service и repository
    productRepo := repository.NewProductRepository(db)
    productService := services.NewProductService(productRepo)
    productHandler := handlers.NewProductHandler(productService)

    // Инициализация review service и repository
    reviewRepo := repository.NewReviewRepository(db)
    reviewService := services.NewReviewService(reviewRepo)
    reviewHandler := handlers.NewReviewHandler(reviewService)

    // Admin routes
    r.POST("/admin/login", handlers.AdminLogin)
    admin := r.Group("/admin/dashboard")
    admin.Use(middleware.AuthMiddleware("admin"))
    admin.GET("", handlers.AdminDashboard)

    // User routes
    r.POST("/register", handlers.RegisterUser)
    r.POST("/login", handlers.LoginUser)
    r.GET("/users/:id", handlers.GetUser)
    r.GET("/users", handlers.GetAllUsers)
    r.POST("/users", handlers.CreateUser)
    r.PUT("/users/:id", handlers.UpdateUser)
    r.DELETE("/users/:id", handlers.DeleteUser)

    // Health check
    r.GET("/health", handlers.HealthHandler)

    // Product routes
    products := r.Group("/products")
    {
        products.GET("", productHandler.GetProducts)
        products.GET("/id/:id", productHandler.GetProduct)
        products.GET("/:slug", productHandler.GetProductBySlug)

        // Review routes (вложены в product)
        reviews := products.Group("/id/:productID/reviews")
        {
            reviews.GET("", reviewHandler.GetReviews)
            reviews.POST("", reviewHandler.AddReview)
        }
    }

    // Debug route
    r.GET("/debug/jwt-secret", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"JWT_SECRET_KEY": config.JwtSecretKey})
    })

    return r
}
