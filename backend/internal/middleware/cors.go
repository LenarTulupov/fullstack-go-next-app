package middleware

import (
    "net/http"

    "github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Header("Access-Control-Allow-Origin", "*")
        c.Header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
        c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization")
        c.Header("Access-Control-Allow-Credentials", "true")

        if c.Request.Method == http.MethodOptions {
            c.AbortWithStatus(http.StatusNoContent)
            return
        }

        c.Next()
    }
}