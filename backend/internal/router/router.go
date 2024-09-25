package router

import (
    "github.com/gin-gonic/gin"
    "api/pkg/handlers"
    "api/internal/middleware"
)

func SetupRouter() *gin.Engine {
    r := gin.Default()

    r.Use(middleware.CORSMiddleware())

    r.POST("/register", handlers.RegisterUser)
    r.POST("/login", handlers.LoginUser)
    r.GET("/users/:id", handlers.GetUser)
    r.POST("/users", handlers.CreateUser)
    r.PUT("/users/:id", handlers.UpdateUser)
    r.DELETE("/users/:id", handlers.DeleteUser)

    r.POST("/products", handlers.CreateProduct)
    r.GET("/products", handlers.GetAllProducts)
    r.GET("/products/:id", handlers.GetProduct) 

    r.GET("/health", handlers.HealthHandler)

    return r
}
