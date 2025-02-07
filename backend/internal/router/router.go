package router

import (
    "github.com/gin-gonic/gin"
    "api/pkg/handlers"
    "api/pkg/services"
    "api/pkg/repository"
    "api/internal/middleware"
    "database/sql"
    "net/http"
    "api/pkg/config"
)

func SetupRouter(db *sql.DB) *gin.Engine {
    r := gin.Default()

    // Применяем CORS middleware глобально
    r.Use(middleware.CORSMiddleware())

    // Initialize the product service and repository
    productRepo := repository.NewProductRepository(db)
    productService := services.NewProductService(productRepo)
    productHandler := handlers.NewProductHandler(productService)

    // Admin 
    r.POST("/admin/login", handlers.AdminLogin)

    admin := r.Group("/dashboard/admin")

// Обработка CORS для OPTIONS-запросов
admin.OPTIONS("/*any", func(c *gin.Context) {
	origin := c.Request.Header.Get("Origin")
	allowedOrigins := map[string]bool{
		"https://frontend-ouox.onrender.com": true,
		"http://localhost:3000":              true,
		"https://frontend-five-inky-90.vercel.app": true,
		"https://bloom-lemon.vercel.app":     true,
	}

	if allowedOrigins[origin] {
		c.Header("Access-Control-Allow-Origin", origin)
	} else {
		c.Header("Access-Control-Allow-Origin", "https://frontend-ouox.onrender.com")
	}

	c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")
	c.Header("Access-Control-Allow-Credentials", "true")
	c.Status(http.StatusNoContent)
})

admin.Use(middleware.AuthMiddleware("admin"))
admin.GET("/", handlers.AdminDashboard)


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

    r.GET("/debug/jwt-secret", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{"JWT_SECRET_KEY": config.JwtSecretKey})
    })

    return r
}
