package router

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"api/pkg/handlers"
	"api/pkg/services"
	"api/pkg/repository"
	"api/internal/middleware"
	"api/pkg/config"
)

func SetupRouter(db *sql.DB) *gin.Engine {
	r := gin.Default()

	r.Use(middleware.CORSMiddleware())

	productRepo := repository.NewProductRepository(db)
	productService := services.NewProductService(productRepo)
	productHandler := handlers.NewProductHandler(productService)

	r.POST("/admin/login", handlers.AdminLogin)

	admin := r.Group("/dashboard/admin")
	admin.Use(middleware.AuthMiddleware("admin"))
	{
		admin.GET("/", handlers.AdminDashboard)
	}

	r.POST("/register", handlers.RegisterUser)
	r.POST("/login", handlers.LoginUser)
	r.GET("/users/:id", handlers.GetUser)
	r.POST("/users", handlers.CreateUser)
	r.PUT("/users/:id", handlers.UpdateUser)
	r.DELETE("/users/:id", handlers.DeleteUser)

	r.GET("/health", handlers.HealthHandler)

	r.GET("/products", productHandler.GetProducts)
	r.GET("/products/:id", productHandler.GetProduct)

	r.GET("/debug/jwt-secret", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"JWT_SECRET_KEY": config.JwtSecretKey})
	})

	return r
}
