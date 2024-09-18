package router

import (
    "github.com/gin-gonic/gin"
    "api/pkg/handlers" 
)

func SetupRouter() *gin.Engine {
    r := gin.Default()

    r.POST("/register", handlers.RegisterUser)
    r.POST("/login", handlers.LoginUser)


    return r
}