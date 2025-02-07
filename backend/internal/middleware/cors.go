package middleware

import (
	"time"
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	fmt.Println("CORS middleware applied")

	config := cors.Config{
		AllowAllOrigins: false,
		AllowMethods:    []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:    []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:   []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:          12 * time.Hour,
	}

	allowedOrigins := map[string]bool{
		"https://frontend-ouox.onrender.com": true,
		"http://localhost:3000":              true,
		"https://frontend-five-inky-90.vercel.app": true,
		"https://bloom-lemon.vercel.app":     true,
	}

	return func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")
		fmt.Printf("CORS request from origin: %s\n", origin)

		if allowedOrigins[origin] {
			config.AllowOrigins = []string{origin}
		} else {
			config.AllowOrigins = []string{"https://frontend-ouox.onrender.com"} // По умолчанию
		}

		cors.New(config)(c)
	}
}
